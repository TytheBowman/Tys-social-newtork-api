const { Schema, Types } = require('mongoose');

// Define a new schema for the reaction object.
const reactionSchema = new Schema(
  {
    // Generate a unique identifier for the reaction.
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // The content of the reaction.
    reactionBody: {
      type: String,
      required: true,
      maxlength: 150,
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

// Create a new Mongoose model based on the reaction schema.
const Reaction = mongoose.model('Reaction', reactionSchema);

// Export the Reaction model for use in other parts of the application.
module.exports = Reaction;

