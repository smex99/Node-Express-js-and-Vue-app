const Tag = require('../models/tag');

module.exports = {
  Index: async (req, res, next) => {
    const tags = await Tag.find({});
    res.status(200).json({ tags });
  },

  newTag: async (req, res, next) => {
    const { tag } = req.body;
    const newTag = new Discussion(tag);
    await newTag.save();
    res.status(200).json({ success: true });
  }
}