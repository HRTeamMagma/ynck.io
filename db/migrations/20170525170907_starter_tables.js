
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('shops', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable().unique();
      table.string('url', 1024).nullable();
      table.string('address1', 100).nullable();
      table.string('address2', 100).nullable();
      table.string('city', 100).nullable();
      table.string('state', 20).nullable();
      table.string('zip', 10).nullable();
      table.string('phone', 100).nullable();
      table.string('rating', 10).nullable();
      table.string('latitude', 100).nullable();
      table.string('longitude', 100).nullable();
      table.string('shop_image', 255).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('images', function(table) {
      table.increments('id').unsigned().primary();
      table.string('url', 150).notNullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('favoriteCount').defaultTo(0);
      table.string('image_type', 100);
      table.index('image_type');
    }),
    knex.schema.createTableIfNotExists('tags', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 50).nullable().unique();
    }),
    knex.schema.createTableIfNotExists('images_tags', function(table) {
      table.integer('image_id').references('images.id').onDelete('CASCADE');
      table.integer('tag_id').references('tags.id');
    }),
    knex.schema.createTableIfNotExists('favorites', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('image_id').references('images.id').onDelete('CASCADE');
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('ratings', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('shop_id').references('shops.id').onDelete('CASCADE');
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('value').unsigned();
    }),
    // this adds the necessary shop_id column to the profile table
    knex.schema.table('profiles', function(table) {
      table.integer('shop_id').nullable();
      table.foreign('shop_id').references('shops.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.dropColumn('shop_id');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('ratings');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('favorites');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('images_tags');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('tags');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('images');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('shops');
  });
};
