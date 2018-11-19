const Comment = require('../models/comment');

module.exports = { 
  Index: async (req, res, next) => {
    const comments = await Comment.find({});
    res.status(200).json({ comments });
  },

  newComment: async (req, res, next) => {
    
  }
}