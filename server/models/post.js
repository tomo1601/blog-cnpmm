const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,   
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    status:{
        type: String,
        enum:['PENDING','APPROVED','NOT APPROVED']
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    categories:{
        type: Schema.Types.ObjectId,
        ref:'category'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }

})

module.exports = mongoose.model('posts',PostSchema)