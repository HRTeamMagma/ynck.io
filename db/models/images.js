const bookshelf = require('../');

const Image = bookshelf.Model.extend({
  tableName: 'images',
  profile: function() {
    return this.belongsTo('Profile').withPivot(['image_type']);
  },
  tag: function() {
    return this.belongsToMany('Tag');
  }
});

module.exports = bookshelf.model('Image', Image);
