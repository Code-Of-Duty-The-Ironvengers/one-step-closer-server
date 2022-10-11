const { Schema, model } = require("mongoose");
const { userCollectionName } = require("./User.model");

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    slug: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: userCollectionName,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const goalCollectionName = "Goal";

const Goal = model(goalCollectionName, goalSchema);

module.exports = { Goal, goalCollectionName };
