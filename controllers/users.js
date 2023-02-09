const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      console.log(errors.array());
      throw error;
    }
    const { username, password } = req.body;
    const secret = process.env.SECRET_KEY;
    const user = await Users.findOne({ username: username });
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      secret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ msg: 'Success', token: token });
  } catch (err) {
    next(err);
  }
}

// exports.postSignup = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPass = await bcrypt.hash(password, 12);
//     const user = new Users({
//       username: username,
//       email: email,
//       password: hashedPass
//     });
//     await user.save();
//     res.status(201).json({ msg: 'Success' });
//   } catch (err) {
//     next(err);
//   }
// }