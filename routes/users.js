const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();
const userController = require('../controllers/users');

const Users = require('../models/users');

router.post('/',
  [
    body('username')
      .custom((value, { req }) => {
          return Users.findOne({ username: value }).then(user => {
              if (!user) {
                  return Promise.reject('Username not exists!');
              }
          });
      }),
    body('password')
      .trim()
      .isLength({ min: 3 }),
  ],
  userController.postLogin
);

// router.post('/signup', userController.postSignup);

module.exports = router;