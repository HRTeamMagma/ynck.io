const bookshelf = require('../');

const Image = bookshelf.Model.extend({
  tableName: 'images',
  profile: function() {
    return this.belongsTo('Profile');
  },
  tags: function() {
    return this.belongsToMany('Tag');
  },
  favorites: function() {
    return this.belongsToMany('Profile').through('favorites');
  }
});

module.exports = bookshelf.model('Image', Image);
