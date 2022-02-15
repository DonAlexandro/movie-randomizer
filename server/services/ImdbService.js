const axios = require('axios');

class ImdbService {
  apiUrl = process.env.IMDB_API_URL;
  token = process.env.IMDB_TOKEN;

  async searchMovie(searchString) {
    const response = await axios(this.apiUrl + `/en/API/SearchMovie/${this.token}/${encodeURIComponent(searchString)}`);
    const title = response.data.expression;
    const movies = response.data.results;

    if (!movies || !movies.length) {
      return [];
    }

    return { movies, title: title || searchString };
  }

  async getFullMovieInfo(id) {
    const response = await axios(this.apiUrl + `/uk/API/Title/${this.token}/${id}`);
    const movie = response.data;

    return {
      imdb_movie_id: id,
      title: movie.title,
      year: parseInt(movie.year),
      description: movie.plotLocal || movie.plot,
      genres: movie.genreList.map(({ value }) => ({
        name: value
      })),
      rating: movie.imDbRating
    };
  }
}

module.exports = new ImdbService();
