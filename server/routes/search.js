const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const multer = require('multer')
const path = require('path')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const Category = require('../models/category')
const Post = require('../models/post')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')
require("dotenv").config()

//GET - search
router.get('/search', async(req,res)=>{
    const keyword = req.query.keyword

    const users = await User.find({username:{$regex:keyword, $options:'i'}})

    const category = await Category.find({
        $or:[
            {name:{$regex:keyword, $options:'i'}},
            {description:{$regex:keyword, $options:'i'}}
        ]
    })

    const posts = await Post.find({
        $or:[
            {title: {$regex:keyword, $options:'i'}},
            {desc: {$regex:keyword, $options:'i'}}
        ]
    }).populate("categoryId").populate("userId")

    if(users){
        const posts = await Post.find({userId: users})
            .populate("categoryId")
            .populate("userId")
    
        users.push(...posts)
        
    }

    if(category){
        const posts = await Post.find({categoryId: category})
        .populate("userId")
        .populate("categoryId")

        users.push(...posts)
    }

    if(posts){
        users.push(...posts)
    }

    let search = users
    console.log(search)
    if(search.length === 0){
        return res.status(400).json({success: false, message: "Not found!!"})
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 12
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = search.length
    const totalPage = Math.ceil(total / limit)

    if (parseInt(req.query.limit) !== 0) {
        search = search.slice(startIndex, endIndex)
    }

    // Pagination result
    const pagination = {}

    if (endIndex < total) {
        pagination.next = {
        page: page + 1,
        limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
        page: page - 1,
        limit
        }
    }

    if (parseInt(req.query.limit) !== 0) {
        res.status(200).json({
        success: true,
        count: search.length,
        totalPage,
        pagination,
        data: search
        })
    } else {
        res.status(200).json({
        success: true,
        data: search
        })
    }
})

module.exports = router