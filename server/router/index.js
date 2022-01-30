const { Router } = require('express');
const MovieController = require('../controllers/MovieController');

const router = Router();

router.get('/movie', MovieController.getMovie);

module.exports = router;
