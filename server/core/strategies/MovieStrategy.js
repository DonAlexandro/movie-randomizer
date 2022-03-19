const { validationResult } = require('express-validator');
const ErrorResponse = require('../responses/ErrorResponse');

class MovieStrategy {
  constructor(strategy, validationError = '') {
    this.strategy = strategy;
    this.validationError = validationError;
  }

  async apply(req, res, next) {
    try {
      if (this.validationError) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return next(ErrorResponse.BadRequest(this.validationError, errors.array()));
        }
      }

      await this.strategy(req, res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieStrategy;
