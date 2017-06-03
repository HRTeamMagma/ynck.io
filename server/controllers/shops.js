const models = require('../../db/models');
const helper = require('../helpers/db_helpers');

module.exports.getShopInfoForUser = (req, res) => {
  models.Shop.where({id: req.query.id}).fetch().then( user => {
    res.send(user.toJSON());
  });
  
  // ({profile_id: req.query.id}).fetch({withRelated: ['shop']})
  // .then( results => {
  //   res.send(results.toJSON());
  // })
};