const { Model } = require('objection');

class MovieGenre extends Model {
  static get tableName() {
    return 'movies_genres';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['movie_id', 'genre_id'],
      properties: {
        movie_id: { type: 'string' },
        genre_id: { type: 'number' }
      }
    };
  }
}

module.exports = MovieGenre;
