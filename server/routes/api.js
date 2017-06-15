'use strict';
const express = require('express');
const router = express.Router();
const dummy = require('../../dummyData');
const ProfileController = require('../controllers').Profiles;
const ImageController = require('../controllers').Images;
const ShopController = require('../controllers').Shops;
const FavoriteController = require('../controllers').Favorites;
const SearchController = require('../controllers').Search;
const StatsController = require('../controllers/stats');


const upload = require('../helpers/upload_helpers');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/user/edit')
  .post(ProfileController.editUserProfile);

router.route('/user/my-tattoos')
  .get(ProfileController.getUserTattoos)
  .post((req, res) => {
    res.send(201);
  });

router.route('/user/inspirations')
  .get(ProfileController.getUserInspirations)
  .post((req, res) => {
    res.send(201);
  });


router.route('/user/favorites')
  .get(FavoriteController.getUserFavorites)
  .post(FavoriteController.addToUserFavorites);

router.route('/user/designs')
  .get(ProfileController.getUserDesigns)
  .post((req, res) => {
    res.send(201);
  });

router.route('/get-page-size')
  .get(ImageController.getTotalNumberOfTattoos);

router.route('/shop')
  .get(ShopController.getShopInfoForUser)
  .post(ShopController.updateShopInfo);

router.route('/create/shop')
  .post(ShopController.createShop);

router.route('/allShops')
  .get(ShopController.getAllShops);

router.route('/latest-images')
  .get(ImageController.getLatestImages);

router.route('/upload-image')
  .post(upload.single('imageUpload'), ImageController.uploadImage);

router.route('/edit-image')
  .post(ImageController.editImage);

router.route('/delete-tag')
  .post(ImageController.removeTagFromImage);

router.route('/add-tag')
  .post(ImageController.addTagToImage);

router.route('/search')
  .get(SearchController.getSearchResults);

router.route('/following')
  .get(ProfileController.getUserFollowing)
  .post(ProfileController.followUnfollowUser);

router.route('/followers')
  .get(ProfileController.getUserFollowers);

router.route('/stats/count-per-tag')
  .get(StatsController.getNumberOfTattoosPerTags);

router.route('/stats/total-tagged')
  .get(StatsController.getTotalNumOfTaggedImages);

module.exports = router;
