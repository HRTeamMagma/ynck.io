const models = require('../../db/models');

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
  models.Profile.where({ id: req.query.id }).fetch({withRelated: ['images.tags']})
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
      // console.log(responseObj);
      res.send(responseObj);
    });
};

module.exports.getFavorites = (req, res) => {
  models.Profile.where({ id: req.query.id }).fetch({withRelated: ['favorites.tags']})
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.send(profile.related('favorites').toJSON());
    });
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
