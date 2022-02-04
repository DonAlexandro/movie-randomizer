/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('genres', (table) => {
    table.increments('genre_id').primary();
    table.string('name').notNullable();

    // table.foreign('genre_id').references('genre_id').inTable('movies_genres');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('genres');
};
