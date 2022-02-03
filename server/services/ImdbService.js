const axios = require('axios');

class ImdbService {
  apiUrl = process.env.IMDB_API_URL;
  token = process.env.IMDB_TOKEN;

  async searchMovie(searchString) {
    const response = await axios(this.apiUrl + `/en/API/SearchMovie/${this.token}/${encodeURIComponent(searchString)}`);
    const title = response.data.expression;
    const movies = response.data.results;

    if (!movies.length) {
      return [];
    }

    return { movies, title: title || searchString };
  }

  async getMovieInfo(id) {
    const response = await axios(this.apiUrl + `/uk/API/Title/${this.token}/${id}`);
    const movie = response.data;

    return {
      year: movie.year,
      description: movie.plotLocal || movie.plot,
      genres: movie.genres,
      rating: movie.imDbRating
    };
  }
}

module.exports = new ImdbService();
