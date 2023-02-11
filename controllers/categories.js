const categoriesService = require('../services/categories');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoriesService.getCategories();
    res.status(200).json({ msg: 'Success', data: categories });
  } catch (err) {
    next(err);
  }
};