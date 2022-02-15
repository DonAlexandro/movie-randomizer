/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('movies_genres', (table) => {
    table.dropColumn('movie_id');

    table.string('movie_id').notNullable().references('imdb_movie_id').inTable('movies').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('movies_genres', (table) => {
    table.dropColumn('movie_id');
    table.string('movie_id').notNullable().references('imdb_movie_id').inTable('movies').onDelete('NO ACTION');
  });
};
