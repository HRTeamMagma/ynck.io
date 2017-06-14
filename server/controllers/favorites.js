const models = require('../../db/models');
const helper = require('../helpers/db_helpers');

module.exports.getUserFavorites = (req, res) => {
  models.Profile.where({ id: req.query.user_id }).fetch({withRelated: ['favorites.tags']})
    .then(results => {
      if (!results) {
        throw results;
      }
      results = helper.cleanTags(results.related('favorites').toJSON());
      res.send({images: results});
    })
    .catch(error => {
      res.send(500, 'Error fetching user favorites: ' + error);
      console.log('Error: ', error);
    });
};

module.exports.addToUserFavorites = (req, res) => {
  let loggedInUserID = req.body.loggedInUser;
  let favoritedImageID = req.body.favoritedImage;
  models.Favorite.where({profile_id: loggedInUserID, image_id: favoritedImageID}).fetchAll()
  .then( result => {
    if ( result.length === 0) {
      models.Favorite.forge({ 
        profile_id: loggedInUserID, 
        image_id: favoritedImageID
      }).save()
      .tap( favorite => {
        models.Image.where({id: favorite.get('image_id')}).fetch()
        .then( result => {
          let favCount = result.attributes.favoriteCount;
          result.save({favoriteCount: favCount + 1}, {method: 'update'})
          .then(success => {
            res.send(201);
          });
        });
      })
      .catch(error => {
        res.send(500);
        throw error;
      });
    } else {
      models.Image.where({id: favoritedImageID}).fetch()
        .then(result => {
          let favCount = result.attributes.favoriteCount;
          result.save({favoriteCount: favCount - 1}, {method: 'update'});
        })
        .then(success => {
          models.Favorite.where({profile_id: loggedInUserID, image_id: favoritedImageID}).destroy()
          .then(success => {
            res.send(201);
          });
        })
        .catch(error => {
          res.send(500);
          throw error;
        });
    }
  })
  .catch(error => {
    res.send(500);
    throw error;
  });
};