const { Client } = require('@notionhq/client');
const { getRandomNumberInRange } = require('../utils/functions');
const RedisService = require('./RedisService');
const ImdbService = require('./ImdbService');
const DatabaseService = require('./DatabaseService');

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

class MovieService {
  async cacheMovieDetails(movie) {
    const movieDetails = await ImdbService.searchMovie(movie.to_do.text[0].plain_text);
    RedisService.createCache(movie.id, movieDetails);

    return Object.assign(movieDetails, { notionId: movie.id });
  }

  async findOne() {
    const randomMovieNumber = getRandomNumberInRange(100);

    const cachedMovies = await RedisService.getCache('movies');

    if (cachedMovies && cachedMovies.length) {
      const movie = cachedMovies[randomMovieNumber];

      const cachedMovie = await RedisService.getCache(movie.id);

      if (cachedMovie) {
        return Object.assign(cachedMovie, { notionId: movie.id });
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

  async findFullMovieInfo({ imdbMovieId, notionMovieId }) {
    const fullMovieFromCache = await RedisService.getCache(imdbMovieId);

    if (fullMovieFromCache) {
      return fullMovieFromCache;
    }

    const fullMovieFromDB = await DatabaseService.findMovieById(imdbMovieId);

    if (fullMovieFromDB) {
      RedisService.createCache(imdbMovieId, fullMovieFromDB);
      return fullMovieFromDB;
    }

    const fullMovieAPI = await ImdbService.getFullMovieInfo(imdbMovieId);
    const newFullMovieFromDB = await DatabaseService.saveMovie(fullMovieAPI, notionMovieId);

    RedisService.createCache(imdbMovieId, newFullMovieFromDB);

    return newFullMovieFromDB;
  }

  async markMovieAsWatched(watchedMovie) {
    if (!watchedMovie.title) {
      const cachedMovieToBeDeleted = await RedisService.getCache(watchedMovie.notionMovieId);
      watchedMovie.title = cachedMovieToBeDeleted.title;
    }

    DatabaseService.deleteMovieById(watchedMovie.notionMovieId);
    RedisService.deleteCache(watchedMovie.notionMovieId);

    const titleWithRating = `${watchedMovie.title} (${watchedMovie.rating}/10)`;

    await notion.blocks.children.append({
      block_id: process.env.WATCHED_MOVIES_PAGE_ID,
      children: [
        {
          object: 'block',
          type: 'to_do',
          to_do: {
            text: [
              {
                type: 'text',
                text: {
                  content: titleWithRating
                },
                plain_text: titleWithRating
              }
            ],
            checked: true
          }
        }
      ]
    });

    await notion.blocks.delete({
      block_id: watchedMovie.notionMovieId
    });

    return `Кіно "${watchedMovie.title}" було оцінено і відмічено, як переглянуте`;
  }
}

module.exports = new MovieService();
