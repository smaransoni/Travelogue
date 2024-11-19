//importing Node core modules
const express = require('express');
const bodyParser = require('body-parser');

//importing third-party libraries
const mongoose = require('mongoose');
const placesRoute = require('./routes/places-routes.js');
const usersRoute = require('./routes/users-routes.js');
const HttpError = require('./models/http-error.js');

const app = express();

// Middlewares //
// app.use() to register a middleware function
//Parsing the incoming json data
app.use(bodyParser.json());

//CORS configuration middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //'*' (any domain) or 'https://localhost:3000' value allows us to control which domains should have access to the backend, i.e., where the browser should allow a res from this server
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); // Indicates which headers the client (frontend) can send with requests (e.g., Content-Type, Authorization).
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); //Specifies which HTTP methods (e.g., GET, POST) are permitted.
  next(); //to let middleware continue it's journey to other middlewares
});

app.use('/api/places/', placesRoute); // =>/api/places...
app.use('/api/users/', usersRoute);

app.use((req, res, next) => {
  const error = new HttpError('Could not find the route.', 404);
  throw error;
});

// error handling middelware function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  //Constructing a JSON response object
  res.json({ message: error.message || 'An unknown error occured!' });
});

mongoose
  .connect(
    // 'mongodb+srv://smar:EmTuKpBALcIR80m1@cluster0.kviht4p.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0'
    'mongodb+srv://demo_user:X4BneFXD4ME08gcn@cluster0.kviht4p.mongodb.net/webappv1'
  )
  .then(() => {
    // Listen on port 5000
    // Start our dev server on port 5000
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
