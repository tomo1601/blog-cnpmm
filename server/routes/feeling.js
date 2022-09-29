const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const multer = require('multer')
const path = require('path')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const Category = require('../models/category')
const Feeling = require('../models/feeling')
const Post = require('../models/post')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')
require("dotenv").config()

router.post('/createFeeling', verifyAccessToken, async(req,res)=>{
    const post = await Post.findOne({_id:req.body.postId})
    if(!post){
        return res.status(400).json({success: false, error:"Post not exsist!!"})
    }

    let feeling = await Feeling.findOne({
        postId: req.body.postId,
        userId: req.user._id
    })

    if(!feeling){
        feeling = await Feeling.create({
            type: req.body.type,
            postId: req.body.postId,
            userId: req.user._id
        })

        //update feeling
        if(req.body.type == "like"){
            post.likes++
        }
        else{
            post.dislikes++
        }

        await post.save()

        return res.json({success: true, data:post})
    }

    if (req.body.type == feeling.type) {
        await feeling.remove()

        //update feeling
        if(req.body.type == "like"){
            post.likes--
        }
        else{
            post.dislikes--
        }

        await post.save()

        return res.status(200).json({ success: true, data: post })
    }

    feeling.type = req.body.type
    feeling = await feeling.save()

    //update feeling
    if(req.body.type == "like"){
        post.likes++
        post.dislikes--
    }
    else{
        post.dislikes++
        post.likes--
    }

    await post.save()
    
    res.status(200).json({ success: true, data: post })
})

module.exports = router