const JWT = require('jsonwebtoken');
const config = require('../config/config');

// Models
const User = require('../models/user');
const Comment = require('../models/comment');
const Discussion = require('../models/discussion');

// JWT helper function
jwtSignUser = user => {
  return JWT.sign({
    iss: 'learncode',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, config.authentication.jwtSecret);
}

module.exports = {
  // Authenticate users to api with locale strategy email/password
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'This email already exists !'});
    }

    const newUser = new User({ 
      method: 'local',
      local: {
        email: email, 
        password: password
      }
    });
    await newUser.save();
    const token = jwtSignUser(newUser);
  
    res.status(200).json({ token, newUser });
  },

  signIn: async (req, res, next) => {
    const  email = req.value.body.email;
    const user = await User.findOne({ "local.email": email }).populate('local.discussions');
    const token = jwtSignUser(req.user);
    res.status(200).json({ token, user });
  },

  // Authenticate users to api with google and facebook strategies
  googleOAuth: async (req, res, next) => {
    const token = jwtSignUser(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = jwtSignUser(req.user);
    res.status(200).json({ token });
  },

  // Handle Users resources
  Index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({ users });
  },

  getUser: async (req, res, next) => {
    /* const { userId } = req.params; */
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  },

  replaceUser: async (req, res, next) => {
    // Enforce that req.body contains all the fields
    const { userId } = req.value.params;
    const newUser = req.body;
    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  }, 

  updateUser: async (req, res, next) => {
    // req.body may contain any number of fields
    const { userId } = req.value.params;
    const newUser = req.body;
    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  // Handle user Discussions
  getUserDiscussions: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate('local.discussions');
    res.status(201).json(user.local.discussions);
  },

  newUserDiscussion: async (req, res, next) => {
    const { userId } = req.value.params;
    const newDiscussion = new Discussion(req.body);
    const user = await User.findById(userId);
    newDiscussion.user = user;
    await newDiscussion.save();

    user.local.discussions.push(newDiscussion);
    await user.update(user);
    res.status(201).json({ success: true });
  },

  // Handle user Comments
  getUserComments: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate('local.comments');
    res.status(201).json(user.local.comments);
  },

  newUserComment: async (req, res, next) => {
    const { userId } = req.value.params;
    const newComment = new Comment(req.body);
    const user = await User.findById(userId);
    newComment.user = user;
    await newComment.save();

    user.local.comments.push(newComment);
    await user.update(user);
    res.status(201).json({ success: true });
    /* res.status(201).json(newComment); */
  },

  // Handle user profile
  getUserProfile: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(201).json(user.local.profile);
  },

  addUserProfile: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    user.local.profile = req.body;
    await user.update(user);
    res.status(201).json({ user });
  },

  updateUserProfile: async (req, res, next) => {
    const { userId } = req.value.params;
  },

  replaceUserProfile: async (req, res, next) => {
    const { userId } = req.value.params;
  }
}