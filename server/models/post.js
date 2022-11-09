const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Must be three characters long']
    },
    desc: {
        type: String,   
        required: true,
        minlength: [10, 'Must be ten characters long']
    },
    photo: {
        type: String,
        default:'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png',
        required: false
    },
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type: Number,
        default: 0
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref:'category'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }}
)

PostSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'postId',
    justOne: false,
    count: true
})

module.exports = mongoose.model('posts',PostSchema)