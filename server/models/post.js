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
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fno-image-available&psig=AOvVaw0ZCprME6eBol2mrfo7uWJR&ust=1663898037799000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLiy3bClp_oCFQAAAAAdAAAAABAD',
        required: false
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

PostSchema.index({ title: 'text'})

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