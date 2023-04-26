const { User, Thought } = require('../models');
const { trimId } = require('../utils/helpers');

const thoughtController = {
  // Gets all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Gets a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).lean();
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      return res.json({ thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // creates a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const thoughtId = trimId(thought._id);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thoughtId } },
        { new: true, runValidators: true }
      );
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Deletes a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      await User.findOneAndUpdate(
        { _id: thought.UserId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Updates the text of a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // creates a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Removes a reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        );
        if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(thought);
        } catch (err) {
        return res.status(500).json(err);
        }
        },
        };
        
        module.exports = thoughtController;
