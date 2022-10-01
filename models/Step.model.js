const { Schema, model } = require("mongoose");
const { goalCollectionName } = require("./Goal.model");

const stepSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    description: String,
    goal: {
      type: Schema.Types.ObjectId,
      ref: goalCollectionName,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const stepCollectionName = "Step";
const Step = model(stepCollectionName, stepSchema);

module.exports = { stepCollectionName, Step };
