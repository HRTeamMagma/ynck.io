'use strict';
const express = require('express');
const router = express.Router();
const dummy = require('../../dummyData');
const ProfileController = require('../controllers').Profiles;
const ImageController = require('../controllers').Images;
const ShopController = require('../controllers').Shops;
const latLong = require('../../LatLong');
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
  .get(ProfileController.getUserTattoos)
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

// router.route('/shop')
//   .get(ShopController.getShopInfo)
//   .post((req, res) => {
//     console.log(req.body);
//     res.send(201);
//   })

router.route('/user/inspirations')
  .get(ProfileController.getUserInspirations)
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/user/favorites')
  .get(ProfileController.getUserFavorites)
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/user/designs')
  .get(ProfileController.getUserDesigns)
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

router.route('/shop')
  .get((req, res) => {
    var address = dummy.shop.shopInfo.address1 + ' ' + dummy.shop.shopInfo.address2;
    latLong.latLong(address, function(result) {
      dummy.shop.lat = result[0].latitude;
      dummy.shop.lon = result[0].longitude;
      res.send(dummy.shop);
    });
    
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(201);
  });

module.exports = router;
