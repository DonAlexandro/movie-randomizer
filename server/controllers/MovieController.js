const MovieService = require('../services/MovieService');
const SuccessResponse = require('../responses/SuccessResponse');

class MovieController {
  async getMovie(req, res, next) {
    try {
      const movie = await MovieService.findOne();

      SuccessResponse.call(res, movie);
    } catch (error) {
      next(error);
    }
  }

  async getMovieFullInfo(req, res, next) {
    try {
      const movieIds = req.body;

      const movieFullInfo = await MovieService.findFullMovieInfo(movieIds);

      return SuccessResponse.call(res, movieFullInfo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MovieController();
