const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

exports.login = async (req) => {
  try {
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
    return token;
  } catch (err) {
    throw err;
  }
}