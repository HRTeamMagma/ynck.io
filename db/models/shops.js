const bookshelf = require('../');

const Shop = bookshelf.Model.extend({
  tableName: 'shops',
  profile: function() {
    return this.hasOne('Profile');
  },
  ratings: function() {
    return this.belongsToMany('Profile').through('Rating');
  },
  shopimages: function() {
    return this.hasMany('Shopimage');
  }
});

module.exports = bookshelf.model('Shop', Shop);
