// Import the necessary modules
const express = require('express');
const thoughtController = require('../../controllers/thoughtController');

// Create a new router instance
const router = express.Router();

// Define the routes for /api/thoughts
router.route('/')
  .get(thoughtController.getThoughts)   // GET request to get all thoughts
  .post(thoughtController.createThought);  // POST request to create a new thought

// Define the routes for /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(thoughtController.getSingleThought)  // GET request to get a single thought by ID
  .put(thoughtController.updateThought)   // PUT request to update a thought by ID
  .delete(thoughtController.deleteThought);  // DELETE request to delete a thought by ID

// Define the routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction)  // POST request to add a reaction to a thought
  .delete(thoughtController.removeReaction);  // DELETE request to remove a reaction from a thought

// Export the router module for use in other files
module.exports = router;
