const express = require( 'express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const postRouter = require('./routes/post')
const searchRouter = require('./routes/search')
const feelingRouter = require('./routes/feeling')

require('dotenv').config()

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://vanquang:1234567890@webblog.ybxxmbt.mongodb.net/webblog?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected')
    } catch (error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app =express()

app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/post',postRouter)
app.use('/api',searchRouter)
app.use('/api/feeling',feelingRouter)

const PORT = 5000

app.listen(PORT, () =>console.log(`server start on port ${PORT}`))