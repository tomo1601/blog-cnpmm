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
const cloudinary = require('cloudinary').v2
require("dotenv").config()
const fs = require('fs')

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

router.post('/newpost',verifyAccessToken, uploadFile.single('thum'),async(req,res)=>{
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
            status:'PENDING',
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

module.exports = router