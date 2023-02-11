const Orders = require('../models/orders');

exports.countOrders = async (req) => {
  try {
    const documents = await Orders.find().countDocuments();
    return documents;
  } catch (err) {
    throw err;
  }
}

exports.getOrders = async (req) => {
  try {
    const currentPage = req.query.currentPage || 1;
    const perPage = 2;
    const orders = await Orders.find().select('-_id -__v').skip((currentPage - 1) * perPage).limit(perPage);
    return orders;
  } catch (err) {
    throw err;
  }
}

exports.createOrder = async (customer, products, totalAmount) => {
  const newOrder = new Orders({
    products: products,
    total_amount: totalAmount,
    name: customer.name,
    email: customer.email,
    phone_number: customer.phoneNumber,
    street: customer.street,
    apartment: customer.apartment,
    city: customer.city,
    zip: customer.zip,
    country: customer.country
  });
  await newOrder.save();
}