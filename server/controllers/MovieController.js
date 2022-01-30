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
}

module.exports = new MovieController();
