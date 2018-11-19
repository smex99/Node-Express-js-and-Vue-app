const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: String,
  discussion: {
    type: Schema.Types.ObjectId,
    ref: 'discussion'
  }
});

const Tag = mongoose.model('tag', tagSchema);
module.exports = Tag;