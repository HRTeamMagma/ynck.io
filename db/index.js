const knex = require('knex')(require('../knexfile'));
const bookshelf = require('bookshelf')(knex);
var cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin(cascadeDelete);
bookshelf.plugin('registry');

module.exports = bookshelf;
