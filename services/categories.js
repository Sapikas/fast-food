const Category = require('../models/categories');

exports.getCategories = async () => {
  try {
    const categories = await Category.find().sort('name');
    if (!categories) {
      const error = new Error('Could not find categories');
      error.statusCode = 404;
      throw error;
    }
    return categories;
  } catch (err) {
    throw err;
  }
}