const Knex = require('knex');
const { Model } = require('objection');
const Genre = require('../models/GenreModel');
const MovieGenre = require('../models/MovieGenreModel');
const { development } = require('../knexfile');

const Movie = require('../models/MovieModel');

class DatabaseService {
  connect() {
    const knex = Knex(development);

    Model.knex(knex);
  }

  saveMovie(fullMovie, notionMovieId) {
    const { genres, ...movie } = fullMovie;

    return Movie.transaction(async (trx) => {
      const createdMovie = await Movie.query(trx)
        .insertAndFetch({
          ...movie,
          rating: parseFloat(movie.rating),
          notion_movie_id: notionMovieId
        })
        .returning('*');

      const createdGenres = await Genre.query(trx).insertAndFetch(genres).onConflict('name').merge().returning('*');

      const movieGenres = createdGenres.map(({ id }) => ({ movie_id: createdMovie.imdb_movie_id, genre_id: id }));
      await MovieGenre.query(trx).insert(movieGenres);

      return { ...createdMovie, genres: createdGenres };
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

  async deleteMovieById(id) {
    await Movie.query().delete().where('notion_movie_id', '=', id);
  }
}

module.exports = new DatabaseService();
