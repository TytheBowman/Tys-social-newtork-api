const { User, Thought } = require('../models');

module.exports = {
// Get all users
getAllUsers(req, res) {
User.find()
.then((users) => {
const userObj = {
users
};
return res.json(userObj);
})
.catch((err) => {
console.log(err);
return res.status(500).json({ message: 'Unable to retrieve users' });
});
},
// Get a single user
getSingleUser(req, res) {
User.findOne({ _id: req.params.userId})
.lean()
.then((user) =>
!user
? res.status(404).json({ message: 'User not found' })
: res.json({ user })
)
.catch((err) => {
console.log(err);
return res.status(500).json({ message: 'Unable to retrieve user' });
});
},
// Create a new user
createUser(req, res) {
User.create(req.body)
.then((user) => res.json({ message: 'User created successfully', user }))
.catch((err) => res.status(500).json({ message: 'Unable to create user' }));
},
// Delete a user and their associated thoughts
deleteUser(req, res) {
User.findOneAndRemove({ _id: req.params.userId })
.then((user) => {
if (!user) {
return res.status(404).json({ message: 'User not found' });
}
return Thought.deleteMany({ username: user.username });
})
.then(() => res.json({ message: 'User and associated thoughts deleted successfully' }))
.catch((err) => {
console.log(err);
return res.status(500).json({ message: 'Unable to delete user and thoughts' });
});
},
// Update a username and/or email address
updateUser(req, res) {
User.findOneAndUpdate(
{_id: req.params.userId},
{$set: {email: req.body.email, username: req.body.username}},
{ new: true, runValidators: true }
)
.then((user) =>
!user
? res.status(404).json({ message: 'User not found' })
: res.json({ message: 'User updated successfully', user })
)
.catch((err) => res.status(500).json({ message: 'Unable to update user' }));
},
// Add a friend
addFriend(req,res) {
User.findOneAndUpdate(
{_id: req.params.userId},
{$addToSet: {'friends' : req.params.friendId}},
{ new: true, runValidators: true }
)
.then((user) =>
!user
? res.status(404).json({ message: 'User not found' })
: res.json({ message: 'Friend added successfully', user })
)
.catch((err) => res.status(500).json({ message: 'Unable to add friend' }));
},
// Delete a friend
deleteFriend(req,res) {
User.findOneAndUpdate(
{ _id: req.params.userId },
{ $pull: { friends: req.params.friendId } },
{ new: true }
)
.then((user) =>
!user
? res.status(404).json({ message: 'User not found' })
: res.json({ message: 'Friend deleted successfully', user })
)
.catch((err) => res.status(500).json(err));
  }
};