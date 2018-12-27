var express = require('express'),
     router = express.Router(),
     productsController = require('../controllers/productsController');

 router.get('/all', productsController.getAllProducts)
        .post('/add', productsController.addNewProduct)
        .get('/:productName', productsController.getProductDetails);

 module.exports = router;
