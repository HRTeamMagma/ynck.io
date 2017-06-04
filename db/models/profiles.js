const bookshelf = require('../');

const Profile = bookshelf.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  shop: function() {
    return this.belongsTo('Shop');
  },
  images: function() {
    return this.hasMany('Image');
  },
  ratings: function() {
    return this.belongsToMany('Shop').through('Rating');
  },
  favorites: function() {
    return this.belongsToMany('Image').through('Favorite');
  }
});

module.exports = bookshelf.model('Profile', Profile);
