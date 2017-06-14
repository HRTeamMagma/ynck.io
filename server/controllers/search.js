const models = require('../../db/models');
const helper = require('../helpers/db_helpers');
const knex = require('../../db/').knex;


module.exports.getSearchResults = (req, res) => {
  req.query.q = req.query.q.toLowerCase();
  if (req.query.searchType === 'tags') {
    models.Tag.where({name: req.query.q}).fetch({withRelated: 'image'})
    .then(results => {
      res.send({imageResults: results.related('image').toJSON()});
    })
    .catch(err => {
      res.send({ msg: `No tattoos found for "${req.query.q}". Try, try again.`});
    });
  } else if (req.query.searchType === 'shops') {
    knex.raw(`SELECT name, shop_image FROM shops where lower(name) like '%${req.query.q}%'`)
      .then(results => {
        if (results.rows[0]) {
          res.send({shops: results.rows});
        } else {
          res.send({ msg: `No shops named for "${req.query.q}" were found. Try, try again.`});
        }
      });
  } else if (req.query.searchType === 'users') {
    knex.raw(`SELECT first, last, profile_image FROM profiles where lower(first) like '%${req.query.q}%' OR lower(last) like '%${req.query.q}%'`)
      .then(results => {
        if (results.rows[0]) {
          res.send({users: results.rows});
        } else {
          res.send({ msg: `No users named "${req.query.q}" were found. Try, try again.`});
        }
      });
  } else {
    res.send({ msg: 'Nothing found.'});
  }
};

// In raw SQL
// SELECT * FROM images INNER JOIN images_tags ON images.id = images_tags.image_id INNER JOIN tags ON tags.id = images_tags.tag_id WHERE tags.name = ' req.query.searchTerm';
