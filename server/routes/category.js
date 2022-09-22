const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const { body, validationResult } = require('express-validator')
const Category = require('../models/category')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')

router.post("/newcategory",verifyAccessToken, verifyAdminRole, async(req,res)=>{
    try {
        const category = await Category.create({...req.body,})
        return res.json({ success: true, category })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
   
})

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

router.get("/get-all", async(req,res)=>{
    try {
        const listCategory = await Category.find()
        if (!listCategory) {
            return res
                .status(400)
                .json({ message: 'No category found!' })
        }
        return res.json({ listCategory: listCategory })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

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

module.exports = router