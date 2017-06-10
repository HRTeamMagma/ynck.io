
exports.up = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.string('profile_description', 255).nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.dropColumn('profile_description');
  });
};