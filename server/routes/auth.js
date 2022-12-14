const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const Post = require('../models/post')
const { verifyAccessToken, verifyAdminRole } = require('../middlewares/jwt_service')
const sendMail = require('../middlewares/mail_service')
require('dotenv').config()


router.get("/", verifyAccessToken, async (req, res) => {
    try {
        const user = await User.findById(req.id).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'user not found' })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

});

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
            fullname: username,
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

        if (user.status === 'NOT ACTIVE') {
            return res
                .status(400)
                .json({ success: false, message: 'This user is blocked!' })
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

router.get("/logout", verifyAccessToken, async (req, res) => {
    res.send("Logout successful!")
});

//send mail to reset password
router.get("/forgotpassword", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, email: req.body.email })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or email!' })
        }

        let otpCode = Math.floor(100000 + Math.random() * 900000).toString()
        //let text = `Click here: http://localhost:5000/api/auth/resetpassword?otp=${otpCode}&id=${user._id}`

        let text = `User: ${req.body.username} <br>New password: ${otpCode}`
        const hashedPassword = await argon2.hash(otpCode)
        user.password = hashedPassword
        //user.otp = otpCode
        await user.save()

        await sendMail(req.body.email, "Here is your new password!!", text)        
        //await sendMail(req.body.email, "Here is your link to reset password!!", text)
        res.json({ success: true})

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//reset password
router.get("/resetpassword", async (req, res) => {
    try {

        const user = await User.findById({ _id: req.query.id })

        if (!user.otp === req.query.otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        const hashedPassword = await argon2.hash(req.query.otp)
        user.password = hashedPassword
        user.otp = ''
        await user.save()
        //return res.redirect()
        return res.json({ success: true, message: `Your new password is ${req.query.otp}` })


    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post("/sendmailotp", async (req, res) => {
    try {
        let otpCode = Math.floor(100000 + Math.random() * 900000).toString()
        let text = `Here is OTP code to verify your email: ${otpCode}`
        if (req.body.email !== undefined) {
            await sendMail(req.body.email, "Here is OTP code to verify your email!", text)
            res.json({ success: true, otp: otpCode })
        }
        else {res.json({ success: false, message: 'request body undefined' })}
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router