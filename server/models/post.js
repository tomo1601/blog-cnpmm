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

PostSchema.index({ title: 'text' })

PostSchema.virtual('likes', {
    ref: 'feeling',
    localField: '_id',
    foreignField: 'postId',
    justOne: false,
    count: true,
    match: { type: 'like' }
})

PostSchema.virtual('dislikes', {
    ref: 'feeling',
    localField: '_id',
    foreignField: 'postId',
    justOne: false,
    count: true,
    match: { type: 'dislike' }
})

PostSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'postId',
    justOne: false,
    count: true
})

module.exports = mongoose.model('posts',PostSchema)