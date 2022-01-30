const { Client } = require('@notionhq/client');
const { getRandomNumberInRange } = require('../utils/functions');
const RedisService = require('./RedisService');
const ImdbService = require('./ImdbService');

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

class MovieService {
  async cacheMovieDetails(movie) {
    const movieDetails = await ImdbService.searchMovie(movie.to_do.text[0].plain_text);
    RedisService.createCache(movie.id, movieDetails);

    return Object.assign(movieDetails, { dbID: movie.id });
  }

  async findOne() {
    const randomMovieNumber = getRandomNumberInRange(100);

    const cachedMovies = await RedisService.getCache('movies');

    if (cachedMovies && cachedMovies.length) {
      const movie = cachedMovies[randomMovieNumber];

      const cachedMovie = await RedisService.getCache(movie.id);

      if (cachedMovie) {
        return cachedMovie;
      }

      const movieDetails = await this.cacheMovieDetails(movie);

      return movieDetails;
    }

    const movies = await notion.blocks.children.list({
      block_id: process.env.MOVIES_PAGE_ID
    });

    RedisService.createCache('movies', movies.results);

    const movie = movies.results[randomMovieNumber];
    const movieDetails = await this.cacheMovieDetails(movie);

    return movieDetails;
  }
}

module.exports = new MovieService();
