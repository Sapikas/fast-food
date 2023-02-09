const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();
const orderController = require('../controllers/orders');
const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, orderController.getOrders);

router.post('/', //add extra validation?
  [
    body('customer.email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail()
  ],
  orderController.createOrder
);

module.exports = router;