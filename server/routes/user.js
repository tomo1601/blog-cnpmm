const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')

//DELETE - delete user by id
router.delete("/delete-user/:id", verifyAccessToken, async (req, res) => {
    // await Post.find({user:req.params.id})
    // .then(function(posts){
    //     if(posts){
    //         return res.status(400)
    //         .json({message: 'Can not delete this user!' })
    //     }
    // })
    try {
        await User.findByIdAndDelete({ _id: req.params.id })
        res.send("Delete successful!")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});
//get put delete post
// @desc    change user's password
router.put("/update-password/:id", verifyAccessToken, async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }
    try {
        const user = await User.findById({ _id: req.params.id })
        if (!(await argon2.verify(user.password, req.body.currentPassword))) {

            return res.status(400).json({
                success: false,
                error: [
                    { field: 'currentPassword', message: 'Current password is incorrect' }
                ]
            })
        }
        const hashedPassword = await argon2.hash(req.body.newPassword)
        user.password = hashedPassword
        await user.save()
        const { password, __v, ...info } = user._doc
        return res.json({ success: true, info })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

//GET - get all user
router.get("/get-all", verifyAccessToken, verifyAdminRole, async (req, res) => {
    try {
        const listUser = await User.find()
        if (!listUser) {
            return res
                .status(400)
                .json({ message: 'No user found!' })
        }
        return res.json({ listUser: listUser })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

//GET - get user by id
router.get("/:id", async(req, res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({
                 message: 'Invalid ID!!' 
            })
        }

        const { password, __v, ...info } = user._doc
        return res.json({ success: true, info })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

const upload = multer({
    storage : multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'./uploads/');
        },
        filename:function(req,file,callback){
            callback(null,file.fieldname + '-' + req.params.id + ".png")
        }         
    })
})

//POST - create new user
router.post("/newuser", upload.single('avatar'),verifyAccessToken, verifyAdminRole, async (req, res)=>{
    const { username, password, email} = req.body
    try {
        const hashedPassword = await argon2.hash(req.body.password)

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            status: 'ACTIVE'
        })

        if(req.file){
            const avatar = "http://localhost:5000/"+ req.file.path
            newUser.avatar = avatar
        }

        await newUser.save()

        return res.json({ success: true, message: 'User created' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

//PUT - change avatar
router.put("/updateAvatar/:id", verifyAccessToken,upload.single('avatar'), async (req, res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }
    try {
        const url = "http://localhost:5000/"+ req.file.path
        const user = await User.findById({ _id: req.params.id })
        if(!user){
            return res.status(400).json({
                 message: 'Invalid ID!!' 
            })
        }

        user.avatar = url
        await user.save()
        const { password, __v, ...info } = user._doc
        return res.json({ success: true, info })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

//PUT - block a user
router.put("block/:id", verifyAccessToken, verifyAdminRole, async (req, res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }
    try {
        const user = await User.findById({ _id: req.params.id })
        if(!user){
            return res.status(400).json({
                 message: 'Invalid ID!!' 
            })
        }

        user.status = 'NOT ACTIVE'
        await user.save()
        const { password, __v, ...info } = user._doc
        return res.json({ success: true, info })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
} )

module.exports = router