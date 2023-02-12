const Orders = require('../models/orders');
const Products = require('../models/products')

exports.countOrders = async () => {
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
    const orders = await Orders.find().select('-__v -products -street -apartment -city -zip -country')
                  .skip((currentPage - 1) * perPage).limit(perPage);
    return orders;
  } catch (err) {
    throw err;
  }
}

exports.getOrder = async (req) => {
  try {
    const { orderId } = req.params;
    const order = await Orders.findById(orderId).select('-__v');
    if (!order) {
      const error = new Error('Could not find order.');
      error.statusCode = 404;
      throw error;
    }
    let products = [];
    for (let prod of order.products) {
      const product = await Products.findById(prod.pid).select('-__v -category_id');
      products.push(product);
    }
    order.products = undefined;
    return { order: order, products: products };
  } catch(err) {
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