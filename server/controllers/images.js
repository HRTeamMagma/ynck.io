const models = require('../../db/models');
const knex = require('../../db/').knex;
const helper = require('../helpers/db_helpers');

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
  
  // knex('images').orderBy('created_at', 'desc').where('image_type', '=', 'tattoo').limit(10)
  // .then(result => {
  //   res.send(result);
  // })
  // models.Image.query( (qb) => {
  //   qb.where('image_type', '=', 'tattoo')
  // })
  // .then(results => {
  //   console.log(results);
  // })
  // knex.raw(`select * from images inner join images_profiles on images_profiles.image_id = images.id and images_profiles.image_type = 'tattoo' limit 3`)
  // .then((results) => {
  //   console.log(results.rows);
  //   res.send(results.rows);
  // });
  
  //  inner join images_tags where images.id = images_tags.image_id inner join tags on tags.id = images_tags.tag_id;
  // models.Image
  // .query( (qb) => {
  //   qb.where('image_type', '=', 'tattoo');
  // })
  // .orderBy('created_at')
  // .fetchPage({
  //   pageSize: 10,
  //   page: 1
  // })
  // .then((result) => {
  //   console.log(result);
  // })

  // .orderBy('created_at')
  // .fetchPage({
  //   pageSize: 10,
  //   page: 1,
  //   withRelated: 'tags'
  // })
  // .then((images) => {
  //   console.log(images);
  //   res.send('yo');
  // }) 
};