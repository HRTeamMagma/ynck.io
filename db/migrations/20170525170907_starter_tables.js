
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('shops', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable().unique();
      table.string('url', 150).nullable();
      table.string('address1', 100).nullable();
      table.string('address2', 100).nullable();
      table.string('city', 100).nullable();
      table.string('state', 20).nullable();
      table.string('phone', 100).nullable();
      table.integer('user_id').references('profiles.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('images', function(table) {
      table.increments('id').unsigned().primary();
      table.string('url', 150).notNullable();
    }),
    knex.schema.createTableIfNotExists('images_users', function(table) {
      table.integer('user_id').references('profiles.id');
      table.integer('image_id').references('images.id');
      table.string('image_type', 100);
      table.index('image_type');
    }),
    knex.schema.createTableIfNotExists('tags', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 50).nullable().unique();
    }),
    knex.schema.createTableIfNotExists('tags_images', function(table) {
      table.integer('image_id').references('images.id');
      table.integer('tag_id').references('tags.id');
    }),
    knex.schema.createTableIfNotExists('users_favorites', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('image_id').references('images.id');
      table.integer('user_id').references('profiles.id');
    }),
    knex.schema.createTableIfNotExists('ratings', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('shop_id').references('shops.id');
      table.integer('user_id').references('profiles.id');
      table.integer('value').unsigned();
    }),
    // this adds the necessary shop_id column to the profile table
    knex.schema.table('profiles', function(table) {
      table.integer('shop_id').references('shops.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('shop_id');
    }),
    knex.raw('DROP TABLE IF EXISTS ratings CASCADE'),
    knex.raw('DROP TABLE IF EXISTS users_favorites CASCADE'),
    knex.raw('DROP TABLE IF EXISTS tags_images CASCADE'),
    knex.raw('DROP TABLE IF EXISTS tags CASCADE'),
    knex.raw('DROP TABLE IF EXISTS images_users CASCADE'),
    knex.raw('DROP TABLE IF EXISTS images CASCADE'),
    knex.raw('DROP TABLE IF EXISTS shops CASCADE')
  ]);
};
