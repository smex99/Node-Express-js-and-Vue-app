const Discussion = require('../models/discussion');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = { 
  Index: async (req, res, next) => {
    const discussions = await Discussion.find({}).populate('user');
    res.status(200).json({ discussions });
  },

  newDiscussion: async (req, res, next) => {
    const user = await User.findById(req.body.user);
    const newDiscussion = req.body;
    delete newDiscussion.user;

    const discussion = new Discussion(newDiscussion);
    discussion.user = user;
    await discussion.save();

    user.local.discussions.push(discussion);
    await user.save();
    res.status(200).json({ 'success': true });
  },

  getDiscussion: async (req, res, next) => {
    const { discussionId } = req.value.params;
    const discussion = await Discussion.findById(discussionId).populate('user');
    res.status(200).json({ discussion });
  },

  getDiscussionComments: async (req, res, next) => {
    const { discussionId } = req.value.params;
    const discussion = await Discussion.findById(discussionId).populate('comments');
    res.status(201).json(discussion.comments);
  },

  newDiscussionComment: async (req, res, next) => {
    const { discussionId } = req.value.params;
    const newComment = new Comment(req.body);
    const discussion = await Discussion.findById(discussionId);
    newComment.discussion = discussion;
    await newComment.save();

    discussion.comments.push(newComment);
    await discussion.save();
    res.status(201).json({ success: true });
  },
}