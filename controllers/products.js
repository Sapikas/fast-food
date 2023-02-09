const axios = require('axios');
const Products = require('../models/products');
const API_KEY = process.env.FIXER_API_KEY;

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

exports.getCategoryProducts = async (req, res, next) => {
  try {
    const { categoryId, currency } = req.query;
    const currentPage = req.query.currentPage || 1;
    const perPage = 2;
    const documents = await Products.find({ category_id: categoryId }).countDocuments();
    if (documents === 0) {
      const error = new Error('Could not find products for this category');
      error.statusCode = 404;
      throw error;
    }
    const totalItems = documents;
    const products = await Products.find({ category_id: categoryId })
                      .select('-category_id -_id -__v')
                      .skip((currentPage - 1) * perPage).limit(perPage);
    if (currency && currency !== 'EUR') {
      await asyncForEach(products, async (product, index) => {
        try {
          const response = await axios.get(`https://api.apilayer.com/fixer/convert?to=${currency}&from=EUR&amount=${product.price}`, {
            headers: { apikey: API_KEY }
          });
          products[index].price = response.data.result;  
        } catch (err) {
          throw err;
        }
      })
    }
    res.status(200).json({ msg: 'Success', data: products, totalItems: totalItems });
  } catch (err) {
    next(err);
  }
}

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, imageUrl, quantity, categoryId } = req.body;
    let product = new Products({
      name: name,
      price: price,
      description: description,
      imageUrl: imageUrl,
      quantity: quantity,
      category_id: categoryId
    });
    await product.save();
    res.status(201).json({ msg: 'Success' });
  } catch (err) {
    next(err);
  }
};

