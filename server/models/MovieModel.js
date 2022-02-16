const { Model } = require('objection');

class Movie extends Model {
  static get idColumn() {
    return 'imdb_movie_id';
  }

  static get tableName() {
    return 'movies';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['imdb_movie_id', 'notion_movie_id', 'title'],
      properties: {
        imdb_movie_id: { type: 'string', description: 'Id from IMDb database' },
        notion_movie_id: { type: 'string', description: 'Id from Notion list' },
        title: { type: 'string', description: 'Title of a movie' },
        year: { type: 'number', description: 'Year of movie production' },
        description: { type: 'string', description: 'Plot of movie in Ukrainian or English' },
        rating: { type: 'number', description: `Viewer's rating of a movie` }
      }
    };
  }

  static get relationMappings() {
    const Genre = require('./GenreModel');

    return {
      genres: {
        relation: Model.ManyToManyRelation,
        modelClass: Genre,
        join: {
          from: 'movies.imdb_movie_id',
          through: {
            from: 'movies_genres.movie_id',
            to: 'movies_genres.genre_id'
          },
          to: 'genres.id'
        }
      }
    };
  }
}

module.exports = Movie;
