const { Schema, model } = require('mongoose');
const { formatDate } = require('../utils/helpers');

/**
 * A Mongoose schema for a thought object.
 */
const thoughtSchema = new Schema(
  {
    // The content of the thought.
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // The timestamp when the thought was created.
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // The user who created the thought.
    username: {
      type: String,
      required: true,
    },
    // An array of reaction objects associated with the thought.
    reactions: [
      {
        // The content of the reaction.
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
        },
        // The user who created the reaction.
        username: {
          type: String,
          required: true,
        },
        // The timestamp when the reaction was created.
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    // Include virtuals in the JSON representation of the schema.
    toJSON: {
      getters: true,
      virtuals: true,
    },
    // Exclude the _id field from the JSON representation of the schema.
    id: false,
  }
);

/**
 * A virtual property that retrieves the number of reactions associated with the thought.
 */
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

/**
 * A getter that formats the createdAt field using the formatDate helper function.
 */
thoughtSchema.path('createdAt').get(function(value) {
  return formatDate(value);
});

// Create a Mongoose model for the thought schema.
const Thought = model('Thought', thoughtSchema);

// Export the Thought model for use in other parts of the application.
module.exports = Thought;
