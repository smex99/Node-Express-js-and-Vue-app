const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

require('../passport');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelpers');
const DiscussionsController = require('../controllers/discussions');

const passportJWT = passport.authenticate('jwt', { session: false});

router.route('/')
  .get(DiscussionsController.Index)
  .post(DiscussionsController.newDiscussion);

router.route('/:discussionId')
  .get(validateParam(schemas.idSchema,'discussionId'), DiscussionsController.getDiscussion)

router.route('/:discussionId/comments')
  .get(validateParam(schemas.idSchema,'discussionId'), DiscussionsController.getDiscussionComments)
  .post(validateParam(schemas.idSchema,'discussionId'), DiscussionsController.newDiscussionComment);

module.exports = router;