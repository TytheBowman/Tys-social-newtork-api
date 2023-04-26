// Importing the required packages and files
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Defining the port to listen on
const PORT = process.env.PORT || 3001;

// Creating an instance of the Express application
const app = express();

// Parsing incoming request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Attaching the application routes
app.use(routes);

// Connecting to the database and starting the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is now running on port ${PORT}!`);
  });
});
