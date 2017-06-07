const models = require('../../db/models');
const knex = require('../../db/').knex;
const helper = require('../helpers/db_helpers');

module.exports.uploadImage = (req, res) => {
  console.log('got an upload', req.file);
  res.status(200).send(req.file);
};

module.exports.getLatestImages = (req, res) => {
  // if the user is logged in
  if (req.user) {
    models.Image.where({image_type: 'tattoo'})
    .orderBy('id', 'DESC')
    .fetchPage({page: 1, pageSize: 6, withRelated: ['tags', 'profile', 'favorites']})
    .then(images => {
      images = helper.cleanTags(images.toJSON());
      images.forEach(image => {
        image.isFavorited = false;
        image.favorites.forEach(favorite => {
          if (favorite._pivot_profile_id === req.user.id) {
            image.isFavorited = true;
          }
        });
        delete image.favorites;
      });
      res.send(images);
    })
    .error(err => {
      res.send(500, 'Error: ' + err);
    });
  } else {
    models.Image.where({image_type: 'tattoo'}).orderBy('id', 'DESC').fetchPage({page: 1, pageSize: 6, withRelated: ['tags', 'profile']})
    .then(images => {
      images = helper.cleanTags(images.toJSON());
      images.forEach(function(image) {
        let cleanProfile = image.profile;
        delete cleanProfile.email;
        delete cleanProfile.phone;
        delete cleanProfile.created_at;
        delete cleanProfile.updated_at;
        cleanProfile.profileUrl = '/user/' + image.profile.id;
        image.profile = cleanProfile;
      });
      res.send(images);
    })
    .error(err => {
      res.send(500, 'Error: ' + err);
    });
  }
};