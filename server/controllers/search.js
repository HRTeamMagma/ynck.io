const models = require('../../db/models');
const helper = require('../helpers/db_helpers');


module.exports.getSearchResults = (req, res) => {
  console.log('req', req.query);
  models.Tag.where({name: req.query.searchInput}).fetch({withRelated: 'image'})
  .then(tag => {
    console.log('list of images', tag.related('image').toJSON());
    res.sendStatus(200);
  });
};

// SELECT * FROM images INNER JOIN images_tags ON images.id = images_tags.image_id INNER JOIN tags ON tags.id = images_tags.tag_id WHERE tags.name = 'retro';
