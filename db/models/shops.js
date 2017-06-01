const bookshelf = require('../');

const Shop = bookshelf.Model.extend({
  tableName: 'shops',
  owner: function() {
    return this.belongsTo('Profile');
  },
  ratings: function() {
    return this.hasMany('Rating').withPivot(['value']);
  }
});

module.exports = bookshelf.model('Shop', Shop);
