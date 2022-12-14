const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const multer = require('multer')
const path = require('path')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const Category = require('../models/category')
const Post = require('../models/post')
const Feeling = require('../models/feeling')
const Comment = require('../models/comment')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')
const cloudinary = require('cloudinary').v2
require("dotenv").config()
const fs = require('fs')
const { getSystemErrorMap } = require('util')

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadFile = multer({
    storage : multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'./uploads/');
        },
        filename:function(req,file,callback){
            callback(null,file.fieldname + 'post-'+ req.body.title+'-' + req.user._id + ".png")
        }         
    })
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

router.post('/upload/:id',verifyAccessToken,uploadFile.single('thum'),async (req, res, next) =>{
    const options = {
        folder: "cnpm moi",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
  
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(req.file.path, options)
        //remove file from local
        removeTmp(req.file.path)
        res.json({public_id: result.public_id, url: result.secure_url})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
})

//- POST - create new post
router.post('/newpost',verifyAccessToken, uploadFile.single('photo'),async(req,res)=>{
    const{title,desc,categoryId} = req.body

    const options = {
        folder: "cnpm moi",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }

    try {
        const category = await Category.findById(req.body.categoryId)
        if(!category){
            return res.status(400).json({success: false, error:"Category not exsist!!"})
        }

        const newPost = new Post({
            title,
            desc,
            categoryId,
            userId: req.user._id
        })

        if(req.file){
            // Upload the image
            const result = await cloudinary.uploader.upload(req.file.path, options)
            //remove file from local
            removeTmp(req.file.path)

            newPost.photo = result.secure_url
        }

        await newPost.save()

        return res.json({ success: true, newPost })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//PUT - Edit post
router.put('/:id', verifyAccessToken,uploadFile.single('photo'), async(req,res)=>{

    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter POST ID!!'
       })
    }

    const options = {
        folder: "cnpm moi",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }

    try {
        const editPost = await Post.findById(req.params.id)
        if(!editPost){
            return res.status(400).json({success: false, error:"Post not exsist!!"})
        }

        const category = await Category.findById(req.body.categoryId)
        if(!category){
            return res.status(400).json({success: false, error:"Category not exsist!!"})
        }

        editPost.title = req.body.title
        editPost.desc = req.body.desc
        editPost.categoryId = req.body.categoryId

        if(req.file){
            // Upload the image
            const result = await cloudinary.uploader.upload(req.file.path, options)
            //remove file from local
            removeTmp(req.file.path)

            editPost.photo = result.secure_url
        }

        await editPost.save()

        return res.json({ success: true, editPost })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//delete - user
router.delete('/delete-post',verifyAccessToken, async(req,res)=>{
    try {
        // let post = await Post.findOne({ userId: req.user._id, _id: req.params.id }) //userId de kiem tra co phai nguoi viet bai
        //                                                                             //muon xoa bai viet hay khong
        
        const list_id = req.body.id
        let posts = await Post.find({ '_id': { $in: list_id },userId: req.user._id })
        //return res.json(Object.keys(list_id).length)
        if(posts.length === 0) {
            return res.status(400).json({success: false, error:"Posts not exsist!!"})
        }

        await Feeling.deleteMany({postId: { $in: list_id}})
        await Comment.deleteMany({postId: { $in: list_id}})
        await Post.deleteMany({'_id': { $in: list_id}})
        // await post.remove();
        return res.json({ success: true, message:"Delete successfully!!" });
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
})

//delete - admin
router.delete('/admin/deletepost',verifyAccessToken, verifyAdminRole, async(req,res)=>{
    try {
        // let post = await Post.findOne({ userId: req.user._id, _id: req.params.id }) //userId de kiem tra co phai nguoi viet bai
        //                                                                             //muon xoa bai viet hay khong
        
        const list_id = req.body.id
        
        let posts = await Post.find({ '_id': { $in: list_id }})

        //return res.json(Object.keys(list_id).length)
        if(posts.length !== Object.keys(list_id).length) {
            return res.status(400).json({success: false, error:"Posts not exsist!!"})
        }

        await Feeling.deleteMany({postId: { $in: list_id}})
        await Comment.deleteMany({postId: { $in: list_id}})

        await Post.deleteMany({'_id': { $in: list_id}})

        // await post.remove();
        return res.json({ success: true, message:"Delete successfully!!" });
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
})


//GET - get all post
router.get('/get-all',async(req,res)=>{
    try {
        const listPost = await Post.find().sort({createDate:-1})
        .populate("userId",["fullname","avatar"])
        .populate("comments")
        if(!listPost){
            return res
                .status(400)
                .json({ message: 'No Post found!' })
        }
        res.json({success:true,success: true, listPost: listPost })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//GET - get post by id
router.get("/:id",async(req,res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter POST ID!!' 
       })
    }
    try {
        const post = await Post.findById(req.params.id)
        .populate("userId",["fullname","avatar"])
        .populate("comments")
        if(!post){
            return res
                .status(400)
                .json({ message: 'Invalid ID!!' })
        }
        res.json({ success: true, post })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//GET - get post by categoryid - ?categoryId=
router.get("/", async(req,res)=>{
    if(!req.query){
        return res.status(400).json({
            message: 'Please enter USER OR CATEGORY ID!!' 
       })
    }
    
    let post
    try{
        if(req.query.categoryId){
            post = await Post.find({categoryId: req.query.categoryId})
            .sort({createDate:-1}).populate("userId",["fullname","avatar"]).populate("comments")
        }
        else if(req.query.userId){
            post = await Post.find({userId: req.query.userId})
            .sort({createDate:-1}).populate("userId",["fullname","avatar"]).populate("comments")
        }
        

        if(!post){
            return res
                .status(400)
                .json({ message: 'Invalid ID!!' })
        }

        res.json({ success: true, post })

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})

//GET - get post by userid - ?userId=
router.get("/get/:userId", async(req,res)=>{
    if(!req.params.userId){
        return res.status(400).json({
            message: 'Please enter USER ID!!' 
       })
    }

    try {
        const post = await Post.find({userId: req.params.userId})
        .sort({createDate:-1}).populate("userId",["fullname","avatar"]).populate("comments")
        if(!post){
            return res
                .status(400)
                .json({ message: 'Invalid USER ID!!' })
        }

        res.json({ success: true, post })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router