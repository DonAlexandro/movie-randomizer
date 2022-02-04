const { Router } = require('express');
const MovieController = require('../controllers/MovieController');

const router = Router();

router.get('/movie', MovieController.getMovie);
router.post('/fullMovieInfo', MovieController.getMovieFullInfo);

module.exports = router;
