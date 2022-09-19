const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:['ACTIVE','NOT ACTIVE']
    },
    posts:{
        type: Schema.Types.ObjectId,
        ref:'posts'
    },
    createDate:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('category',CategorySchema)