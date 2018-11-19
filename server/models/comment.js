const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  date: Date,
  discussions: {
    type: Schema.Types.ObjectId,
    ref: 'discussion'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;