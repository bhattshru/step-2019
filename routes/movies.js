var express = require('express'),
     router = express.Router(),
     moviesController = require('../controllers/moviesController');

 router.get('/all', moviesController.getAllMovies)
        .post('/add', moviesController.addNewMovie)
        .get('/:productName', moviesController.getMovieDetails);

 module.exports = router;
