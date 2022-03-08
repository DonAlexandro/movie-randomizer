const { Router } = require('express');
const MovieController = require('../controllers/MovieController');
const { idPairValidator, watchedValidator } = require('../validators');

const router = Router();

router.get('/movie', MovieController.getMovie);
router.post('/fullMovieInfo', idPairValidator, MovieController.getMovieFullInfo);
router.post('/watched', watchedValidator, (req, res, next) => MovieController.watched(req, res, next));

module.exports = router;
