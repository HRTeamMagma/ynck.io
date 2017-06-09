const models = require('../../db/models');
const helper = require('../helpers/db_helpers');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};


module.exports.getUserProfilePage = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch({withRelated: ['images.tags']})
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      
      let allImages = profile.related('images').toJSON();
      let responseObj = {};
      allImages.forEach(function(image) {
        let thisImage = {};
        thisImage.tags = [];
        thisImage.id = image.id;
        if (image.tags.length > 0) {
          image.tags.forEach(function(tag) {
            thisImage.tags.push(tag.name);
          });
        }
        thisImage.url = image.url;
        if (responseObj[image._pivot_image_type]) {
          responseObj[image._pivot_image_type].push(thisImage);
        } else {
          responseObj[image._pivot_image_type] = [thisImage];
        }
      });

      let theUser;
      if (req.user) {
        theUser = req.user;
      } else {
        theUser = false;
      }
      res.render('index.ejs', {userData: responseObj, user: theUser});
    });
};

module.exports.getUserImages = (req, res) => {
  models.Image.where({ profile_id: req.query.id }).fetchAll({withRelated: ['tags']})
    .then(results => {
      if (!results) {
        throw results;
      } else {
        models.Profile.where({id: req.query.id}).fetch()
        .then(result => {
          let allImages = helper.cleanTags(results.toJSON());
    //       res.send(allImages)
    //     })
    // }
          let responseObj = {};
          responseObj.userProfile = result.toJSON();
          allImages.forEach(function(image) {
            // let thisImage = {};
            // thisImage.id = image.id;
            // thisImage.url = image.url;
            if (responseObj[image.image_type]) {
              responseObj[image.image_type].push(image);
            } else {
              responseObj[image.image_type] = [image];
            }
          });
          // console.log(responseObj);
          res.send(responseObj);
        });
      }
    });
};


module.exports.getUserTattoos = (req, res) => {
  models.Image.where({ profile_id: req.query.id, image_type: 'tattoo' }).fetchAll({withRelated: ['tags']})
  .then(results => {
    results = helper.cleanTags(results.toJSON());
    res.send({images: results});
  });
};


module.exports.getUserDesigns = (req, res) => {
  models.Image.where({ profile_id: req.query.id, image_type: 'design' }).fetchAll({withRelated: ['tags']})
    .then(results => {
      results = helper.cleanTags(results.toJSON());
      res.send({images: results});
    });
};

module.exports.getUserInspirations = (req, res) => {
  models.Image.where({ profile_id: req.query.id, image_type: 'inspiration' }).fetchAll({withRelated: ['tags']})
    .then(results => {
      results = helper.cleanTags(results.toJSON());
      res.send({images: results});
    });
};

module.exports.editUserProfile = (req, res) => {
  if (req.user.id === req.body.id) {
    models.Profile.where({ id: req.body.id }).fetch()
      .then(profile => {
        if (!profile) {
          throw profile;
        }
        return profile.save(req.body, { method: 'update' });
      })
      .then(() => {
        res.sendStatus(201);
      })
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  } else {
    res.sendStatus(500);
  }
};
// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
