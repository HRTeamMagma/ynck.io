const bookshelf = require('../');

const Profile = bookshelf.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  shop: function() {
    return this.hasOne('Shop');
  },
  images: function() {
    return this.hasMany('Image').withPivot(['image_type']);
  },
  ratings: function() {
    return this.hasMany('Rating').withPivot(['value']);
  }
});

module.exports = bookshelf.model('Profile', Profile);
