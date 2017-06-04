const models = require('../../db/models');
const helper = require('../helpers/db_helpers');
const latLong = require('../../LatLong');

module.exports.getShopInfoForUser = (req, res) => {
  models.Profile.where({id: req.query.id}).fetch({withRelated: ['shop', 'shop.shopimages']})
  .then ( profile => {
    let theData = profile.related('shop').toJSON();
    let responseObj = {};
    responseObj.images = theData.shopimages;
    delete theData.shopimages;
    responseObj.shopInfo = theData;

    var address = responseObj.shopInfo.address1 + ' ' + responseObj.shopInfo.address2;
    latLong.latLong(address, function(result) {
      responseObj.lat = result[0].latitude;
      responseObj.lon = result[0].longitude;
      res.send(responseObj);
    });
  });
};


    // var address = dummy.shop.shopInfo.address1 + ' ' + dummy.shop.shopInfo.address2;
    // latLong.latLong(address, function(result) {
    //   dummy.shop.lat = result[0].latitude;
    //   dummy.shop.lon = result[0].longitude;
    //   res.send(dummy.shop);
    // });