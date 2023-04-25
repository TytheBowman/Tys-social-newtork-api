const { Schema, Types } = require('mongoose');

/**
 * A Mongoose schema for a reaction object.
 */
const reactionSchema = new Schema(
  {
    // A unique identifier for the reaction.
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // The content of the reaction.
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // The timestamp when the reaction was created.
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // The user who created the reaction.
    username: {
      type: Schema.Types.String,
      ref: 'User',
    },
  },
  {
    // Include virtuals in the JSON representation of the schema.
    toJSON: {
      virtuals: true,
    },
    // Exclude the reactionId field from the JSON representation of the schema.
    id: false,
  }
);

// Export the reactionSchema for use in other parts of the application.
module.exports = reactionSchema;
