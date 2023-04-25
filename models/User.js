const { Schema, Types, model } = require('mongoose');

// Define a reaction schema to be used as a subdocument in the thought schema
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

// Define the thought schema for creating the Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 150,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // use the reaction schema as a subdocument
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Define a virtual to get the number of reactions for a thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Define a virtual to format the createdAt date
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return new Date(this.createdAt).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
});

// Define the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
