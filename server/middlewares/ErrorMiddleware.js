const { NotFoundError } = require('objection');
const ErrorResponse = require('../core/responses/ErrorResponse');

const errorMiddleware = (error, req, res) => {
  console.error(error);

  if (error instanceof ErrorResponse) {
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  } else if (error instanceof NotFoundError) {
    return res.status(404).json({ message: 'Запитувана інформація знайдена не була' });
  }

  return res.status(500).json({ message: 'Невідома помилка серверу. Спробуй заново пізніше' });
};

module.exports = errorMiddleware;
