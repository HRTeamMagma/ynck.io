'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;
// This route is /api/profiles

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
  ;

router.route('/user-data')
  .get(ProfileController.getUserImages);
  
// router.route('/user')
//   .get(ProfileController.getUser);

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
