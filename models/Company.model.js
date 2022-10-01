const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    desireability: {
      type: String,
      enum: ["Hell Nah", "Meh", "Please Say Yeh"],
    },
    website: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const companyCollectionName = "Company";

const Company = model(companyCollectionName, companySchema);

module.exports = { Company, companyCollectionName };
