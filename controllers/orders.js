const { validationResult } = require('express-validator/check');

const Orders = require('../models/orders');
const Customers = require('../models/customers');

exports.getOrders = async (req, res, next) => {
  try {
    const currentPage = req.query.currentPage || 1;
    const perPage = 2;
    const documents = await Orders.find().countDocuments();
    if (documents === 0) {
      const error = new Error('Could not find orders.');
      error.statusCode = 404;
      throw error;
    }
    const totalItems = documents;
    const orders = await Orders.find().select('-_id -__v').skip((currentPage - 1) * perPage).limit(perPage);
    res.status(200).json({ msg: 'Success', data: orders, totalItems: totalItems });
  } catch (err) {
    next(err);
  }
}

exports.createOrder = async (req, res, next) => { //check quantity and price??
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422; //right ??
      throw error;
    }
    const { customer, order } = req.body;
    const existCustomer = await Customers.findOne({ email: customer.email }).select('_id');
    if (existCustomer) {
      const newOrder = new Orders({
        guest_id: existCustomer._id,
        products: order.products,
        total_amount: order.totalAmount,
      });
      await newOrder.save();
      return res.status(201).json({ msg: 'Success' });
    }
    const newCustomer = new Customers({
      name: customer.name,
      email: customer.email,
      phone_number: customer.phoneNumber,
      street: customer.street,
      apartment: customer.apartment,
      city: customer.city,
      zip: customer.zip,
      country: customer.country
    });
    const consumer = await newCustomer.save();
    const newOrder = new Orders({
      guest_id: consumer._id,
      products: order.products,
      total_amount: order.totalAmount,
    });
    await newOrder.save();
    res.status(201).json({ msg: 'Success' });
  } catch (err) {
    next(err);
  }
}