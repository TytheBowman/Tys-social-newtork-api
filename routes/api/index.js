// Import the Express router and the user and thought routes modules
const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');

// Use the user routes module for any routes starting with "/users"
router.use('/users', userRoutes);

// Use the thought routes module for any routes starting with "/thoughts"
router.use('/thoughts', thoughtRoutes);

// Export the router module for use in other files
module.exports = router;