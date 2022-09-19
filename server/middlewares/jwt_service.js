const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verifyAccessToken = async(req,res,next) =>{
    try {
        if(!req.headers['authorization']){
            return res
            .status(400)
            .json({success:false, message:'Please login!'})
        }
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
    
        const verify = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = await User.findById({_id:verify.userId})
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