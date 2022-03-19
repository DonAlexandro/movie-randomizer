const { NotFoundError } = require('objection');
const ErrorResponse = require('../core/responses/ErrorResponse');

function errorMiddleware(err, req, res) {
  console.error('TEAOGSDLGJKS', err);

  if (error instanceof ErrorResponse) {
    return res.status(error.status).json({ message: err.message, errors: err.errors });
  } else if (error instanceof NotFoundError) {
    return res.status(404).json({ message: 'Запитувана інформація знайдена не була' });
  }

  return res.status(500).json({ message: 'Невідома помилка серверу. Спробуй заново пізніше' });
}

module.exports = errorMiddleware;
