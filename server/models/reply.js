const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReplySchema = new Schema(
  {
    text: {
      type: String,
      minlength: [3, 'Must be three characters long'],
      required: [true, 'Text is required']
    },
    commentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'comment',
      required: true
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)
module.exports = mongoose.model('reply',ReplySchema)