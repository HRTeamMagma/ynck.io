const bookshelf = require('../');

const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  image: function() {
    return this.belongsToMany('Image');
  }
});

module.exports = bookshelf.model('Tag', Tag);
