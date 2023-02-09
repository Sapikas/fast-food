const Category = require('../models/categories');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort(['name', 'asc']);
    if (!categories) {
      const error = new Error('Could not find categories');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ msg: 'Success', data: categories });
  } catch (err) {
    next(err);
  }
};

// exports.createCategory = async (req, res,next) => {
//   try {
//     let category = new Category({name: req.body.name});
//     await category.save();
//     res.status(201).json({ msg: 'Success' });
//   } catch (err) {
//     next(err);
//   }
// }