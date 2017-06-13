const models = require('../../db/models');
const helper = require('../helpers/db_helpers');


module.exports.getSearchResults = (req, res) => {
  models.Tag.where({name: req.query.searchInput}).fetch({withRelated: 'image'})
  .then(results => {
    res.send({imageResults: results.related('image').toJSON()});
  });
};

// In raw SQL
// SELECT * FROM images INNER JOIN images_tags ON images.id = images_tags.image_id INNER JOIN tags ON tags.id = images_tags.tag_id WHERE tags.name = ' req.query.searchInput';
