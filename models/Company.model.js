const { Schema, model } = require("mongoose");
const { COMPANY_ENUM, MEH } = require("../utils/company-enum-data");

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
      enum: COMPANY_ENUM,
      default: MEH,
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
