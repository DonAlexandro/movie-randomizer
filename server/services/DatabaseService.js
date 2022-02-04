const Knex = require('knex');
const { Model } = require('objection');

const Movie = require('../models/MovieModel');

class DatabaseService {
  connect() {
    const knex = Knex({
      client: 'postgres',
      version: '14',
      connection: {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
      },
      debug: process.env.NODE_ENV === 'development' ? true : false
    });

    Model.knex(knex);
  }

  saveMovie(fullMovie, notionMovieId) {
    const { genres, ...movie } = fullMovie;

    return Movie.transaction(async (trx) => {
      const data = await Movie.query(trx)
        .insertGraph({
          ...movie,
          rating: parseFloat(movie.rating),
          notion_movie_id: notionMovieId,
          genres
        })
        .returning('*');

      return data;
    });
  }

  async findMovieById(id) {
    const movie = await Movie.query().findOne({ imdb_movie_id: id });

    if (movie) {
      const genres = await movie.$relatedQuery('genres');

      return Object.assign(movie, { genres });
    }

    return null;
  }
}

module.exports = new DatabaseService();
