const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar:{
        type: String,
        default: ""
    },
    role:{
        type: String,
        default: "User"
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['ACTIVE','NOT ACTIVE']
    }
})

module.exports = mongoose.model('users',UserSchema)