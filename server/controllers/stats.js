const models = require('../../db/models');
const helper = require('../helpers/db_helpers');
const knex = require('../../db/').knex;


module.exports.getNumberOfTattoosPerTags = (req, res) => {
  knex.raw('SELECT tag_id, count(*) FROM images INNER JOIN images_tags on images.id = images_tags.image_id GROUP BY tag_id ORDER BY tag_id;') 
  .then(results => {
    if (results.rows[0]) {
      res.send(results.rows);
    } else {
      res.send('Error getting number of tattoos per tag');
    }
  });
};

module.exports.getTotalNumOfTaggedImages = (req, res) => {
  knex.raw('SELECT count(DISTINCT image_id) FROM images_tags;') 
  .then(results => {
    console.log('totalnum results.rows[0]', results.rows[0]);
    if (results.rows[0]) {
      res.send(results.rows);
    } else {
      res.send('Error getting number of tattoos per tag');
    }
  });
};
// 
