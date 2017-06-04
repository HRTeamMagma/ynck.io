const models = require('../../db/models');
const helper = require('../helpers/db_helpers');

module.exports.getShopInfoForUser = (req, res) => {
  models.Profile.where({id: req.query.id}).fetch({withRelated: ['shop', 'shop.shopimages']})
  .then ( profile => {
    let theData = profile.related('shop').toJSON();
    let responseObj = {};
    responseObj.images = theData.shopimages;
    delete theData.shopimages;
    responseObj.shopInfo = theData;
    res.send(responseObj);
  });
};