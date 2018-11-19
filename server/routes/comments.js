const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

require('../passport');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelpers');
const CommentsController = require('../controllers/comments');

const passportJWT = passport.authenticate('jwt', { session: false});

router.route('/')
  .get(CommentsController.Index)
  .post(passportJWT, CommentsController.newComment);

module.exports = router;