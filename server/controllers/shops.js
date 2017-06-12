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

module.exports.createShop = (req, res) => {
  let shopToAdd = req.body.data;
  let owner = req.user.id;
  models.Shop.forge({
    name: shopToAdd.name,
    url: shopToAdd.url,
    address1: shopToAdd.location.address1,
    address2: shopToAdd.location.address2,
    city: shopToAdd.location.city,
    state: shopToAdd.location.state,
    zip: shopToAdd.location.zip_code,
    phone: shopToAdd.phone,
    rating: shopToAdd.rating,
    shop_image: null
  })
  .save()
  .tap(shop => {
    models.Profile.where({
      id: owner
    })
    .fetch()
    .then(res => {
      res.save({shop_id: shop.get('id')}, {method: 'update'});
    })
    .then(success => {
      res.sendStatus(201);
    })
    .catch(error => console.log(error));
  });
  // .tap(shop => {
  //   models.Shopimage.forge({
  //     url: shopToAdd.image_url,
  //     shop_id: shop.get('id')
  //   })
  //   .then(success => {
  //     res.sendStatus(201);
  //   })
  //   .catch(error => console.log(error));
  // });
};
