const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
    max: 40
  },
  body: {
    type: String,
    required: true
  },
  img: {
    type: [String]
  },
  views: {
    type: Number
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('posts', PostSchema)