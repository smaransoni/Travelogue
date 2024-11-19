//importing Node core modules
const express = require('express');

//importing third-party libraries
const { check } = require('express-validator');
const usersController = require('../controllers/users-controllers.js');

const router = express.Router();

// middleware function: usersController.getUsers
router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    check('name').notEmpty(),
    check('email')
      .normalizeEmail() //Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
