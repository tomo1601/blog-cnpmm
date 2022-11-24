const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')
require('dotenv').config()

//Post: create comment
router.post('/newcomment',verifyAccessToken,async(req,res)=>{
    if(!req.body.postId){
        return res.status(400).json({
            message: 'Please enter POST ID!!'
       })
    }

    try {
        const post = await Post.findOne({_id:req.body.postId}).populate("comments")
        if(!post){
            return res.status(400).json({success: false, error:"Post not exsist!!"})
        }

        const newComment = new Comment({
            text: req.body.text,
            postId: req.body.postId,
            userId: req.user._id

        })

        await newComment.save();
        let {password,email,role,status,createDate,__v,otp,...info} = req.user._doc
        res.json({success: true, post,newComment,user:info})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

//PUT - Update comment
router.put('/:id',verifyAccessToken, async(req,res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }

    try {
        const comment = await Comment.findOne({_id:req.params.id})
        .populate("postId")
        .populate("userId",["fullname","avatar"])

        if(!comment){
            return res.status(400).json({success: false, error:"Comment not exsist!!"})
        }

        if(!req.user._id.toString() === comment.userId._id.toString()){
            return res.status(400).json({success: false, error:"Don't have permission to fix this comment!!"})
        }
        comment.text = req.body.text

        await comment.save()
        res.json({ success: true, comment })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
})

//DELETE - delete comment
router.delete('/:id',verifyAccessToken, async(req,res)=>{
    const comment = await Comment.findOne({_id:req.params.id})
    .populate("postId")
    .populate("userId",["fullname","avatar"])

    if(!comment){
        return res.status(400).json({success: false, error:"Comment not exsist!!"})
    }

    if(!req.user._id.toString() === comment.userId.toString()){
        return res.status(400).json({success: false, error:"Don't have permission to fix this comment!!"})
    }

    await comment.remove();
    res.json({success: true,  message:"Delete successfully!!", comment });
})

//GET - get all comment by postId
router.get('/',async(req,res)=>{
    if(!req.query.postId){
        return res.status(400).json({
            message: 'Please enter USER ID!!' 
       })
    }

    try {
        const comment = await Comment.find({postId:req.query.postId})
        .sort("-updatedAt")
        // .sort("-createdAt")
        .populate("userId",["fullname","avatar"])

        if(!comment){
            return res
                .status(400)
                .json({ message: 'Invalid ID!!' })
        }

        res.json({ success: true, comment })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router