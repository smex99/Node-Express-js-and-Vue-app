const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({ 
  title: String,
  content: String,
  date: Date,
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Discussion = mongoose.model('discussion', discussionSchema);
module.exports = Discussion;