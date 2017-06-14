const models = require('../../db/models');
const helper = require('../helpers/db_helpers');
const knex = require('../../db/').knex;


module.exports.getSearchResults = (req, res) => {
  if (req.query.searchType === 'tags') {
    models.Tag.where({name: req.query.q}).fetch({withRelated: 'image'})
    .then(results => {
      res.send({imageResults: results.related('image').toJSON()});
    })
    .catch(err => {
      res.send(`No tattoos found for "${req.query.q}"`);
    });
  } else if (req.query.searchType === 'shops') {
    knex.raw(`SELECT name, shop_image FROM shops where name like '%${req.query.q}%'`)
      .then(results => {
        res.send({shops: results.rows});
      })
      .catch(err => {
        res.send(`No shops named for "${req.query.q}" were found`);
      });
  } else { // fallback to search users
    knex.raw(`SELECT first, last, profile_image FROM profiles where first like '%${req.query.q}%' OR last like '%${req.query.q}%'`)
      .then(results => {
        res.send({users: results.rows});
      })
      .catch(err => {
        res.send(`No users named "${req.query.q}" were found`);
      });
  }
};

// In raw SQL
// SELECT * FROM images INNER JOIN images_tags ON images.id = images_tags.image_id INNER JOIN tags ON tags.id = images_tags.tag_id WHERE tags.name = ' req.query.searchInput';
