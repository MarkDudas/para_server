const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    licenseName: {
      type: String,
      required: true,
    },
    issueingOrg: {
      type: String,
    },
    issueDateMonth: {
      type: String,
    },
    issueDateYear: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("license", LicenseSchema);
