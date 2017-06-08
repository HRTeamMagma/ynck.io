const bookshelf = require('../');

const Favorite = bookshelf.Model.extend({
  tableName: 'favorites',
  user: function() {
    return this.belongsTo('Profile');
  },
  image: function() {
    return this.belongsTo('Image');
  }
});

module.exports = bookshelf.model('Favorite', Favorite);