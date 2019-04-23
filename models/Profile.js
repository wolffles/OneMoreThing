// Profile is a model for all of users activity and infomation.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  posts: [
    {
      ref: 'posts',
      type: Schema.Types.ObjectId
    }
  ],
  websites: [
    {
      name: {
        type: String
      },
      URL: {
        type: String
      }
    }
  ],
  date:{
    type: Date,
    default: Date.now
  }
})
module.exports = Profile = mongoose.model('profile', ProfileSchema);