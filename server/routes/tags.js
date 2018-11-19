const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

require('../passport');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelpers');
const TagsController = require('../controllers/tags');

const passportJWT = passport.authenticate('jwt', { session: false});

router.route('/')
  .get(TagsController.Index)
  .post(passportJWT, TagsController.newTag);

module.exports = router;