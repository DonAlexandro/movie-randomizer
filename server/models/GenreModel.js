const { Model } = require('objection');

class Genre extends Model {
  static get tableName() {
    return 'genres';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', description: 'Name of a genre' }
      }
    };
  }

  static get relationMappings() {
    const Movie = require('./MovieModel');

    return {
      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: Movie,
        join: {
          from: 'genres.id',
          through: {
            from: 'movies_genres.genre_id',
            to: 'movies_genres.movie_id'
          },
          to: 'movies.imdb_movie_id'
        }
      }
    };
  }
}

module.exports = Genre;
