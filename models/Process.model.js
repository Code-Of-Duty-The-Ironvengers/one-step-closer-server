const { Schema, model } = require("mongoose");
const { companyCollectionName } = require("./Company.model");
const { stepCollectionName } = require("./Step.model");

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
    status: {
      type: Schema.Types.ObjectId,
      ref: stepCollectionName,
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
    url: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Process = model("Process", processSchema);

module.exports = Process;
