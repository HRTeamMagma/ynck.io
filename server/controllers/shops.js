const models = require('../../db/models');
const helper = require('../helpers/db_helpers');
const latLong = require('../../LatLong');

module.exports.getShopInfoForUser = (req, res) => {
  if (req.user && req.query.shopId === undefined) {
    models.Profile.where({id: req.user.id}).fetch({withRelated: ['shop', 'shop.shopimages']})
    .then ( profile => {
      let theData = profile.related('shop').toJSON();
      let responseObj = {};
      responseObj.images = theData.shopimages;
      delete theData.shopimages;
      responseObj.shopInfo = theData;
      var address = responseObj.shopInfo.address1 + ' ' + responseObj.shopInfo.city + ', ' + responseObj.shopInfo.state;

      latLong.latLong(address, function(result) {
        if (result[0]) {
          responseObj.lat = result[0].latitude;
          responseObj.lon = result[0].longitude;
        }   
        res.send(responseObj);
      });
    });
  } else {
    models.Shop.where({id: req.query.shopId}).fetch({withRelated: 'shopimages'})
    .then(shop => {
      let theData = shop.toJSON();
      let responseObj = {};
      responseObj.images = theData.shopimages;
      delete theData.shopimages;
      responseObj.shopInfo = theData;
      var address = responseObj.shopInfo.address1 + ' ' + responseObj.shopInfo.city + ', ' + responseObj.shopInfo.state;
      latLong.latLong(address, function(result) {
        if (result[0]) {
          responseObj.lat = result[0].latitude;
          responseObj.lon = result[0].longitude;
        }
        res.send(responseObj);
      });
    });
  }
};

module.exports.updateShopInfo = (req, res) => {
  models.Profile.where({id: req.user.id})
  .fetch()
  .then(user => {
    models.Shop.where({id: user.get('shop_id')})
    .fetch()
    .then(shop => {
      shopData = req.body;
      shop.save(shopData, {method: 'update'});
      res.sendStatus(201);
    });
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
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
    shop_image: null,
    latitude: shopToAdd.coordinates.latitude,
    longitude: shopToAdd.coordinates.longitude,
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
    .catch(error => console.log(error));
  })
  .then(shop => {
    models.Shopimage.forge({
      url: shopToAdd.image_url,
      shop_id: shop.get('id')
    })
    .save()
    .catch(error => console.log(error));
  })
  .then(success => {
    res.sendStatus(201);
  })
  .catch(error => console.log(error));
};

module.exports.getAllShops = (req, res) => {
  models.Shop.fetchAll()
  .then((shops) => {
    res.status(200).send(shops);
  })
  .catch(error => console.log(error));
};