const productService = require('../services/products');

exports.getCategoryProducts = async (req, res, next) => {
  try {
    const documents = await productService.countProducts(req);
    if (documents === 0) {
      const error = new Error('Could not find products for this category');
      error.statusCode = 404;
      throw error;
    }
    const products = await productService.findCategoryProducts(req);
    res.status(200).json({ msg: 'Success', data: products, totalItems: documents });
  } catch (err) {
    next(err);
  }
}

exports.createProduct = async (req, res, next) => {
  try {
    const createProductMsg = await productService.createProduct(req);
    res.status(201).json({ msg: createProductMsg });
  } catch (err) {
    next(err);
  }
};

