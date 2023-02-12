const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();
const orderController = require('../controllers/orders');
const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, orderController.getOrders);

router.get('/:orderId', isAuth, orderController.getOrder);

router.post('/',
  [
    body('customer.email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('customer.phoneNumber')
      .isNumeric()
      .withMessage('Phone number must be a numeric value')
      .isLength({ min: 10, max: 15 })
      .withMessage('Phone number must be between 10 and 15 digits long'),
  ],
  orderController.createOrder
);

module.exports = router;