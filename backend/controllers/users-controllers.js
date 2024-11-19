//importing third-party libraries
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error.js');
const User = require('../models/user.js');

const getUsers = async (req, res, next) => {
  let users;
  try {
    //Using the concept of protection for retrieving the email and name
    //User.find({}, 'email name'); - 1st method (Adding an empty js obj and the property names)
    users = await User.find({}, '-password'); // 2nd method - returning everything except the password}
  } catch (err) {
    const error = new HttpError(
      'fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  // using shorthand for properties as the key and value are same
  const createdUser = new User({
    name,
    email,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) }); //status code 201
};

const login = async (req, res, next) => {
  console.log('req hit login');
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({ message: 'Logged in!' });
};

// // Max used exports
// // Why not module.exports
// exports.getUsers = getUsers;
// exports.signup = signup;
// exports.login = login;

module.exports = { getUsers, signup, login };
