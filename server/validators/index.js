const { body } = require('express-validator');

const idPairValidator = [
  body('imdbMovieId')
    .isAlphanumeric()
    .withMessage('IMDb movie ID is not correct')
    .notEmpty()
    .withMessage('IMDd movie ID cannot be empty'),
  body('notionMovieId')
    .isUUID()
    .withMessage('Notion movie ID is not correct')
    .notEmpty()
    .withMessage('Notion movie ID cannot be empty')
];

const watchedValidator = [
  body('notionMovieId')
    .isUUID()
    .withMessage('Notion movie ID is not correct')
    .notEmpty()
    .withMessage('Notion movie ID cannot be empty'),
  body('rating')
    .isInt({ min: 1, max: 10 })
    .withMessage('Рейтинг повинен бути числом від 1 до 10')
    .notEmpty()
    .withMessage('Введи рейтинг'),
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Чому назва фільму пуста?')
    .isAlphanumeric('ru-RU', { ignore: ' ' })
    .withMessage('В назві фільму можуть бути лише числа і букви')
];

module.exports = {
  idPairValidator,
  watchedValidator
};
