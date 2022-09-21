const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema


const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        uniqueCaseInsensitive: true,
        trim: true,
        minlength: [3, 'Title must be three characters long']
    },
    description: {
        type: String,
        minlength: [3, 'Description must be three characters long'],
        required: [true, 'Description is required'],
    },
    createDate:{
        type: Date,
        default: Date.now
    }
})

CategorySchema.plugin(uniqueValidator, { message: '{PATH} already exists.' })

module.exports = mongoose.model('category',CategorySchema)