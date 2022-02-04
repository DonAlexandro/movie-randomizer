/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('movies_genres', (table) => {
    table.increments('id').unsigned().primary();
    table.string('movie_id').notNullable().references('imdb_movie_id').inTable('movies');
    table.integer('genre_id').notNullable().references('genre_id').inTable('genres');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('movies_genres');
};
