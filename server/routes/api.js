'use strict';
const express = require('express');
const router = express.Router();
const dummy = require('../../dummyData');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/profile/my-tattoos')
  .get((req, res) => {
    res.send(dummy.myTattoos);
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/profile/favorites')
  .get((req, res) => {
    res.send(dummy.favorites);
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/profile/designs')
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
