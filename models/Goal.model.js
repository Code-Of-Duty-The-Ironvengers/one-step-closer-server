const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const goalCollectionName = "Goal";

const Goal = model(goalCollectionName, goalSchema);

module.exports = { Goal, goalCollectionName };
