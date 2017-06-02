'use strict';
const express = require('express');
const router = express.Router();
const dummy = require('../../dummyData');
const ProfileController = require('../controllers').Profiles;
const ImageController = require('../controllers').Images;
// these routes start with api

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/latest-images')
  .get(ImageController.getLatestImages);

router.route('/user/my-tattoos')
  .get((req, res) => {
    res.send(dummy.myTattoos);
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/user/favorites')
  .get(ProfileController.getFavorites)
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/user/designs')
  .get((req, res) => {
    res.send(dummy.designs);
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/shop')
  .get((req, res) => {
    res.send(dummy.shop);
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

module.exports = router;
