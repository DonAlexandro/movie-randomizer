const MovieStrategy = require('../core/strategies/MovieStrategy');
const { getMovieStrategy, getFullMovieStrategy, markAsWatchedStrategy } = require('../core/strategies/movies');

class MovieController {
  getMovie(req, res, next) {
    const movieStrategy = new MovieStrategy(getMovieStrategy);
    movieStrategy.apply(req, res, next);
  }

  getMovieFullInfo(req, res, next) {
    const movieStrategy = new MovieStrategy(getFullMovieStrategy, 'Некоректні дані для пошуку кіна');
    movieStrategy.apply(req, res, next);
  }

  watched(req, res, next) {
    const movieStrategy = new MovieStrategy(
      markAsWatchedStrategy,
      'Сталася помилка при додаванні кіна до списку переглянутих'
    );
    movieStrategy.apply(req, res, next);
  }
}

module.exports = new MovieController();
