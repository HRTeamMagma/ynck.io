const bookshelf = require('../');

const Shopimage = bookshelf.Model.extend({
  tableName: 'shopimages',
  shop: function() {
    return this.belongsTo('Shop');
  }
});

module.exports = bookshelf.model('Shopimage', Shopimage);