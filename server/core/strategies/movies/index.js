const MovieService = require('../../../services/MovieService');
const SuccessResponse = require('../../responses/SuccessResponse');

const getMovieStrategy = async (req, res) => {
  const movie = await MovieService.findOne();

  SuccessResponse.call(res, movie);
};

const getFullMovieStrategy = async (req, res) => {
  const movieIds = req.body;

  const movieFullInfo = await MovieService.findFullMovieInfo(movieIds);

  SuccessResponse.call(res, movieFullInfo);
};

const markAsWatchedStrategy = async (req, res) => {
  const response = await MovieService.markMovieAsWatched(req.body);

  SuccessResponse.call(res, response);
};

module.exports = { getMovieStrategy, getFullMovieStrategy, markAsWatchedStrategy };
