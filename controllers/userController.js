const { User, Thought } = require('../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const userObj = {
      users,
    };
    return res.json(userObj);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).lean();
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No such user exists' });
    }
    const thought = await Thought.findOneAndRemove(
      { users: req.params.userId },
      { $pull: { username: req.params.userId } },
      { new: true }
    );
    if (!thought) {
      return res
        .status(404)
        .json({ message: 'User deleted, but no thoughts found' });
    }
    return res.json({ message: 'User successfully deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { email: req.body.email, username: req.body.username } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.addFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

