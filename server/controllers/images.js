const models = require('../../db/models');
const knex = require('../../db/').knex;
const helper = require('../helpers/db_helpers');
const bookshelf = require('../../db/');

module.exports.uploadImage = (req, res) => {
  console.log('got an upload', req.file);
  if (req.body.image_type === 'shopimage') {
    models.Profile.where({id: req.user.id})
    .fetch({withRelated: 'shop'})
    .then(profile => {
      var theShop = profile.related('shop');
      models.Shopimage.forge({
        shop_id: theShop.get('id'),
        url: req.file.location
      })
      .save()
      .then(image => {
        req.file.shopId = theShop.get('id');
        req.file.shopimageId = image.get('id');
        res.status(200).send(req.file);
      });
    });
  } else {
    models.Image.forge({
      url: req.file.location,
      profile_id: req.user.id,
      image_type: req.body.image_type
    })
    .save()
    .then(image => {
      req.file.imageId = image.attributes.id;
      res.status(200).send(req.file);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
  }
};

module.exports.editImage = (req, res) => {
  console.log(req.body);
  if (req.user.id) {
    models.Image.where({id: req.body.imageId})
    .fetch()
    .then(image => {
      image.save({title: req.body.title, profile_id: req.user.id}, {method: 'update'})
      .then(()=> {
        res.sendStatus(201);
      });
    });
  } else {
    res.sendStatus(500);
  }
};

module.exports.removeTagFromImage = (req, res) => {
  let imageId = req.body.imageId;
  let tag = req.body.tagName;
  models.Tag.where({name: tag}).fetch()
  .then(tag => {
    knex('images_tags').where({image_id: imageId, tag_id: tag.get('id')}).del()
    .then(response => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  });
};

module.exports.addTagToImage = (req, res) => {
  if (req.user.id) {
    let imageId = req.body.imageId;
    models.Image.where({id: imageId})
    .fetch()
    .then((image) => {
      let thisTag = req.body.tagName;
      models.Tag.where({name: thisTag}).fetch()
      .then(result => {
        if (!result) {
          models.Tag.forge({name: thisTag})
          .save()
          .tap(tag => {
            knex.raw(`select * from images_tags where image_id=${imageId} and tag_id=${tag.get('id')}`)
            .then(response => {
              if (response.rowCount === 0) {
                knex.raw(`insert into images_tags (image_id, tag_id) VALUES(${imageId}, ${tag.get('id')})`)
                .then(response => {
                  res.sendStatus(201);
                });
              }
            });
          });
        } else {
          knex.raw(`select * from images_tags where image_id=${imageId} and tag_id=${result.get('id')}`)
          .then(response => {
            if (response.rowCount === 0) {
              knex.raw(`insert into images_tags (image_id, tag_id) VALUES(${imageId}, ${result.get('id')})`)
              .then(response => {
                res.sendStatus(201);
              });
            } else {
              res.sendStatus(201);
            }
          });
        }
      });
    });
  } else {
    res.sendStatus(500);
  }
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