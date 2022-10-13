const { Schema, model } = require("mongoose");
const { companyCollectionName } = require("./Company.model");
const { goalCollectionName } = require("./Goal.model");

const processSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
    goal: {
      type: Schema.Types.ObjectId,
      ref: goalCollectionName,
    },
    notes: String,
    nextInteraction: {
      type: Date,
    },
    salary: String,
    location: String,
    company: {
      type: Schema.Types.ObjectId,
      ref: companyCollectionName,
    },
    // Job Posting URL
    url: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const processCollectionName = "Process";
const Process = model(processCollectionName, processSchema);

module.exports = { Process, processCollectionName };
