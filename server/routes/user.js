const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')
const cloudinary = require('cloudinary').v2
require("dotenv").config()
const fs = require('fs')
const Post = require('../models/post')

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


//DELETE - delete user by id
router.delete("/delete-user/:id", verifyAccessToken, async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }
    const posts = await Post.find({userId:req.params.id})
    if(posts.length!==0){
            return res.status(400)
            .json({success: false, message: 'You must delete all your post before delete your account!' })
        }
    try {
        await User.findByIdAndDelete({ _id: req.params.id })
        res.json({success: true,  message:"Delete successfully!!" })
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
        return res.json({ success: true,listUser: listUser })
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

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

//POST - create new user
router.post("/newuser",verifyAccessToken, verifyAdminRole, async (req, res)=>{
    const { username, password, email, fullname} = req.body
    try {
        const hashedPassword = await argon2.hash(req.body.password)

        const newUser = new User({
            username,
            password: hashedPassword,
            fullname,
            email,
            status: 'ACTIVE'
        })

        await newUser.save()

        return res.json({ success: true, message: 'User created' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

//PUT - change profile
router.put("/changeProfile/:id", verifyAccessToken,upload.single('avatar'), async (req, res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }

    if(!req.file){
        return res.status(400).json({
            message: 'No images Selected!!' 
       })
    }

    const options = {
        folder: "cnpm moi",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const user = await User.findById({ _id: req.params.id })
        if(!user){
            return res.status(400).json({
                 message: 'Invalid ID!!' 
            })
        }

        // Upload the image
        const result = await cloudinary.uploader.upload(req.file.path, options)
        //remove file from local
        removeTmp(req.file.path)

        user.fullname = req.body.fullname
        user.avatar = result.secure_url
        await user.save()
        const { password, __v, ...info } = user._doc
        return res.json({ success: true, info })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

//PUT - block a user
router.put("/block", verifyAccessToken, verifyAdminRole, async (req, res)=>{
    
    try {
        const user = await User.findById({ _id: req.body.id })
        if(!user){
            return res.status(400).json({
                 message: 'Invalid ID!!' 
            })
        }

        if(user.status ==="BLOCKED"){
            user.status = 'ACTIVE'
        }
        else if(user.status ==="ACTIVE"){
            user.status = 'BLOCKED'
        }
        await user.save()
        const { password, __v,otp, ...info } = user._doc
        return res.json({ success: true, info })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
} )

module.exports = router