const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyLocation: {
      type: String,
      required: true,
    },
    companyImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("company", CompanySchema);
