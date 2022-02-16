/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('movies', (table) => {
    table.string('imdb_movie_id').primary();
    table.string('notion_movie_id').notNullable().index();
    table.string('title').notNullable();
    table.integer('year').unsigned().nullable();
    table.text('description').nullable();
    table.float('rating').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('movies');
};
