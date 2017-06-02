
exports.up = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.string('profile_image', 150).nullable();
  })
  .then(() => {
    return knex.schema.table('shops', function(table){
      table.string('shop_image', 150).nullable();
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('shops', function(table) {
    table.dropColumn('shop_image');
  })
  .then(() => {
    return knex.schema.table('profiles', function(table) {
      table.dropColumn('profile_image');
    });
  });
};
