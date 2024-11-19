//importing Node core modules
const express = require('express'); //we could import it as named export as we did for 'check'

//importing third-party and custom libraries
const { check } = require('express-validator'); //named import
const placesController = require('../controllers/places-controllers.js');

const router = express.Router();

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlacesByUserId);

// we can add multiple middlewares as arguments
// they will be executed left to right
router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  '/:pid',
  [check('title').notEmpty(), check('description').isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
