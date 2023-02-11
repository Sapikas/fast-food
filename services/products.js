const axios = require('axios');
const API_KEY = process.env.FIXER_API_KEY;
const Products = require('../models/products');

async function convertCurrency(targetCurrency, products) {
  try {
    const response = await axios.get(
      `https://api.apilayer.com/fixer/latest?symbols=${targetCurrency}&base=EUR`, {
        headers: { apikey: API_KEY }
      }
    );
    const exchangeRates = response.data.rates;

    products.map((product) => {
      product.price = (product.price * exchangeRates[targetCurrency]).toFixed(2);
    });
  } catch (error) {
    throw error;
  }
}

exports.countProducts = async (req) => {
  try {
    const { categoryId } = req.query;
    const documents = await Products.find({ category_id: categoryId }).countDocuments();
    return documents;
  } catch (err) {
    throw err;
  }
}

exports.findCategoryProducts = async (req) => {
  try {
    const { categoryId, currency } = req.query;
    const currentPage = req.query.currentPage || 1;
    const perPage = 2;
    const products = await Products.find({ category_id: categoryId })
                      .select('-category_id -_id -__v')
                      .skip((currentPage - 1) * perPage).limit(perPage);
    if (currency && currency !== 'EUR') {
      await convertCurrency(currency, products);
    }
    return products;
  } catch (err) {
    throw err;
  }
}

exports.findProduct = async (id) => {
  try {
    const product = await Products.findOne({ _id: id }).select('price');
    if (!product) {
      const error = new Error('Could not find product');
      error.statusCode = 404;
      throw error;
    }
    return product.price;
  } catch (err) {
    throw err;
  }
}

exports.createProduct = async (req) => {
  try {
    const { name, price, description, imageUrl, quantity, categoryId } = req.body;
    let product = new Products({
      name: name,
      price: price,
      description: description,
      imageUrl: imageUrl,
      category_id: categoryId
    });
    await product.save();
    return 'Success';
  } catch (err) {
    throw err;
  }
}