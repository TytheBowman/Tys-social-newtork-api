// Importing the required functions from the userController file
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
    } = require('../../controllers/userController');
    
    // Creating a new router instance
    const userRouter = require('express').Router();
    
    // Defining the API routes and their respective HTTP methods
    userRouter.get('/users', getUsers); // Route to get all users
    userRouter.post('/users', createUser); // Route to create a new user
    userRouter.get('/users/:userId', getSingleUser); // Route to get a single user by ID
    userRouter.put('/users/:userId', updateUser); // Route to update a single user by ID
    userRouter.delete('/users/:userId', deleteUser); // Route to delete a single user by ID
    userRouter.post('/users/:userId/friends/:friendId', addFriend); // Route to add a friend to a user
    userRouter.delete('/users/:userId/friends/:friendId', deleteFriend); // Route to delete a friend from a user
    
    // Exporting the router instance
    module.exports = userRouter;