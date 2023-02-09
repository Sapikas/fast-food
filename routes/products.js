const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

const isAuth = require('../middlewares/is-auth');

router.get('/', productController.getCategoryProducts);

router.post('/', isAuth, productController.createProduct);

module.exports = router;