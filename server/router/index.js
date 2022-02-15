const { Router } = require('express');
const MovieController = require('../controllers/MovieController');
const { idPairValidator, watchedValidator } = require('../validators');

const router = Router();

router.get('/movie', MovieController.getMovie);
router.post('/fullMovieInfo', idPairValidator, MovieController.getMovieFullInfo);
router.post('/watched', watchedValidator, MovieController.watched);

module.exports = router;
