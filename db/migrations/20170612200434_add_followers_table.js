
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('profiles_profiles', function (table) {
    table.integer('user_id').references('profiles.id').onDelete('CASCADE');
    table.integer('follower_id').references('profiles.id').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'follower_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('profiles_profiles');
};
