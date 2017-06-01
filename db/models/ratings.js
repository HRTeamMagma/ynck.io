const bookshelf = require('../');

const Rating = bookshelf.Model.extend({
  tableName: 'ratings',
  user: function() {
    return this.belongsTo('Profile');
  },
  shop: function() {
    return this.belongsTo('Shop');
  }
});

module.exports = bookshelf.model('Rating', Rating);