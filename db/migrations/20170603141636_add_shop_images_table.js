
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('shopimages', function (table) {
    table.increments('id').unsigned().primary();
    table.integer('shop_id').references('shops.id').onDelete('CASCADE');
    table.string('url', 255).nullable();
    table.string('title', 100).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shopimages');
};
