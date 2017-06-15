const models = require('../../db/models');
const helper = require('../helpers/db_helpers');
const knex = require('../../db/').knex;


module.exports.getNumberOfTattoosForTags = (req, res) => {
  knex.raw('SELECT tag_id, count(*) FROM images INNER JOIN images_tags on images.id = images_tags.image_id GROUP BY tag_id ORDER BY tag_id;') 
  .then(results => {
    if (results.rows[0]) {
      res.send(results.rows);
    } else {
      res.send('Error getting number of tattoos per tag');
    }
  });
};

