// Import the Express router and the API routes module
const router = require('express').Router();
const apiRoutes = require('./api');

// Use the API routes module for any routes starting with "/api"
router.use('/api', apiRoutes);

// If the requested route doesn't match any defined routes, send a "Wrong route!" error message
router.use((req, res) => res.send('Wrong route!'));

// Export the router module for use in other files
module.exports = router;