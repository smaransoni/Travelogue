//importing third-party libraries
const mongoose = require('mongoose');
//third party package to validate if an email that we want to create exists already
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  //unique property speeds up the querying process of the email by creating an internal
  //index when fetching it from db
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
});

//adding the third party package to our schema using the plugin method to validate
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
