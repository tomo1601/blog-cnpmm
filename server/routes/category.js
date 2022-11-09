const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const { body, validationResult } = require('express-validator')
const Category = require('../models/category')
const Post = require('../models/post')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')

//POST - create new category
router.post("/newcategory",verifyAccessToken, verifyAdminRole, async(req,res)=>{
    try {
        const category = await Category.create({...req.body,})
        return res.json({ success: true, category })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
   
})

//PUT - change category
router.put("/:id",verifyAccessToken, verifyAdminRole, async(req,res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
          })
        if(!category){
            return res.status(400).json({
                message: 'Invalid ID!!' })
        }
    return res.json({ success: true, category })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
})

//GET - get all category
router.get("/get-all", async(req,res)=>{
    try {
        const listCategory = await Category.find().sort({createDate:-1})
        if (!listCategory) {
            return res
                .status(400)
                .json({ message: 'No category found!' })
        }
        return res.json({success: true, listCategory: listCategory })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//GET - get category by id
router.get("/:id", async(req,res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res
                .status(400)
                .json({ message: 'Invalid ID!!' })
        }
        return res.json({ success: true, category })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//DELETE - delete category
router.delete('/:id',verifyAccessToken, async(req,res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: 'Please enter ID!!' 
       })
    }
    try {
        //find another category different category want delete
        const newCategory = await Category.findOne({_id:{$nin:req.params.id}})
        if(!newCategory){
            return res.status(400).json({success:false, message:"Can not delete this category!!"})
        }
        //change category for post that have category delete
        await Post.updateMany({categoryId: req.params.id},{"$set":{categoryId:newCategory._id}})
        
        Category.findByIdAndDelete(req.params.id, function (err, docs){
            if(err){
                res.status(500).json(err) 
            }
            else{
                res.json({ success: true,message:"Delete successfully"})
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router