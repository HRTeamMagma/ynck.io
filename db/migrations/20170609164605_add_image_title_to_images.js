
exports.up = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.string('title', 255).nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.dropColumn('title');
  });
};
