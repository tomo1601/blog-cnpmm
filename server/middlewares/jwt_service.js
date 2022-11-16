const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config

const verifyAccessToken = async(req,res,next) =>{
    try {
        const authHeader = req.headers['authorization']
        console.log(authHeader)
        if(!authHeader){
            return res
            .status(400)
            .json({success:false, message:'Please login!'})
        }
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
    
        jwt.verify(token,process.env.JWT_SECRET_KEY, (err,data) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" })
            }
            req.id = data.userId
        })
        req.user = await User.findById({_id:req.id})
        if(!req.user){
            return res
            .status(400)
            .json({success:false, message:'User not exsist!'})
        }
        next()
    } catch (error) {
        return next(error)
    }
}

const verifyAdminRole = (req,res,next) =>{
    if(req.user.role === 'Admin'){
        next()
    }else{
        return res
        .status(400)
        .json({message:'No permission!'})
    }
}

module.exports = {verifyAccessToken, verifyAdminRole}