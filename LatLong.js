var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
};

var ad = '1259 North La Brea Avenue Suite 200 West Hollywood, California';

module.exports.latLong = (address, callback) => {
  var geocoder = NodeGeocoder(options);

  // Using callback
  geocoder.geocode(address, function(err, res) {
    callback(res);
  });
};

module.exports.latLong(ad, function(res) {
  console.log('latlong: ', res);
});
