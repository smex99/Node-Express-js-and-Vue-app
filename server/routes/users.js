const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

require('../passport');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

const passportJWT = passport.authenticate('jwt', { session: false});

router.route('/')
  .get(passportJWT, UsersController.Index);

router.route('/:userId')
  .get(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.getUser)
  .put(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.replaceUser)
  .patch(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.updateUser);

router.route('/:userId/discussions')
  .get(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.getUserDiscussions)
  .post(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.newUserDiscussion);

router.route('/:userId/comments')
  .get(validateParam(schemas.idSchema,'userId'), UsersController.getUserComments)
  .post(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.newUserComment);

router.route('/:userId/profile')
  .get(validateParam(schemas.idSchema, 'userId'), passportJWT, UsersController.getUserProfile)
  .post(validateParam(schemas.idSchema, 'userId'), passportJWT, UsersController.addUserProfile)
  .put(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.replaceUserProfile)
  .patch(validateParam(schemas.idSchema,'userId'), passportJWT, UsersController.updateUserProfile);

module.exports = router;