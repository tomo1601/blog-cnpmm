const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FeelingSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['like', 'dislike'],
      required: [true, 'Type is required either like or dislike']
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'posts',
      required: [true, 'Post id is required']
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    }
  })

module.exports = mongoose.model('feeling', FeelingSchema)