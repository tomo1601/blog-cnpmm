
const express = require( 'express');
const mongoose = require('mongoose');

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

app.get('/', (rep,res) => res.send('Hello word!'))

const PORT = 5000

app.listen(PORT, () =>console.log(`server start on port ${PORT}`))