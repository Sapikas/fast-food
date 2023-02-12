const { validationResult } = require('express-validator/check');

const ordersService = require('../services/orders');
const productService = require('../services/products');

exports.getOrders = async (req, res, next) => {
  try {
    const documents = await ordersService.countOrders();
    if (documents === 0) {
      const error = new Error('Could not find orders.');
      error.statusCode = 404;
      throw error;
    }
    const orders = await ordersService.getOrders(req);
    res.status(200).json({ msg: 'Success', data: orders, totalItems: documents });
  } catch (err) {
    next(err);
  }
}

exports.getOrder = async (req, res, next) => {
  try {
    const response = await ordersService.getOrder(req);
    res.status(200).json({ msg: 'Success', data: response.order, products: response.products });
  } catch (err) {
    next(err);
  }
}

exports.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const { customer, products } = req.body;
    let totalAmount = 0;
    let orders = [];
    for (let product of products) {
      let productPrice = await productService.findProduct(product.pid);
      const productQuantity = product.quantity || 1;
      totalAmount += productPrice * productQuantity;
      orders.push(product);
    }
    await ordersService.createOrder(customer, orders, totalAmount.toFixed(2));
    return res.status(201).json({ msg: 'Success' });
  } catch (err) {
    next(err);
  }
}