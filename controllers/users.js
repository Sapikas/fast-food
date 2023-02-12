const { validationResult } = require('express-validator/check');
const userService = require('../services/users');

exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const token = await userService.login(req);
    res.status(200).json({ msg: 'Success', token: token });
  } catch (err) {
    next(err);
  }
}