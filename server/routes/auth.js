const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const Post = require('../models/post')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')

//Post: /register
router.post('/register', body('email').isEmail().normalizeEmail(), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const { username, password, email, avatar } = req.body

    if (!username || !password || !email) {
        return res
            .status(400)
            .json({ success: false, message: 'Enter full username, password and email!' })
    }

    if (Object.keys(password).length <= 6) {
        return res
            .status(400)
            .json({ success: false, message: 'Password must be longer than 7 character!' })
    }

    if (Object.keys(username).length < 5) {
        return res
            .status(400)
            .json({ success: false, message: 'Username must be longer than 5 character!' })
    }
    try {
        const checkUsername = await User.findOne({ username: req.body.username })
        if (checkUsername) {
            return res
                .status(400)
                .json({ success: false, message: 'Username already exsisted!' })
        }

        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail) {
            return res
                .status(400)
                .json({ success: false, message: 'Email already exsisted!' })
        }

        const hashedPassword = await argon2.hash(req.body.password)
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            avatar,
            status: 'ACTIVE'
        })
        await newUser.save()

        return res.json({ success: true, message: 'User created' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//Post: /login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Enter full username and password!' })
    }

    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username!' })
        }
        const validPassword = await argon2.verify(user.password, req.body.password)
        if (!validPassword) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect password!' })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE })
        const { password, __v, ...info } = user._doc
        return res.json({ success: true, info, token })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
// @desc    Log user out

router.get("/logout", verifyAccessToken, async (req, res)=> {
    res.send("Logout successful!")
});

router.delete("/delete-user/:id", verifyAccessToken, async (req, res)=> {
    // await Post.find({user:req.params.id})
    // .then(function(posts){
    //     if(posts){
    //         return res.status(400)
    //         .json({message: 'Can not delete this user!' })
    //     }
    // })
    try {
        await User.findByIdAndDelete({_id:req.params.id})
        res.send("Delete successful!")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});


//test phân quyền
router.get('/getuser', verifyAccessToken, verifyAdminRole, async (req, res) => {
    try {
        const listUser = await User.find()
        if (!listUser) {
            return res
                .status(400)
                .json({ message: 'No user found!' })
        }
        return res.json({ listUser: listUser })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

module.exports = router