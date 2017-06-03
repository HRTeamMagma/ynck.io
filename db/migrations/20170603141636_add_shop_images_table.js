
exports.up = function(knex, Promise) {
  knex.schema.createTableIfNotExists('shop_images', function (table) {
    table.increments('id').unsigned().primary();
    table.integer('shop_id').references('shops.id').onDelete('CASCADE');
    table.string('url', 150).nullable();
    table.string('title', 100).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shop_images');
};
