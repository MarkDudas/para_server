const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyImageUrl: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobResponsibilities: {
      type: String,
      required: true,
    },
    jobQualifications: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    monthlySalaryFrom: {
      type: Number,
      required: true,
    },
    monthlySalaryTo: {
      type: Number,
      required: true,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
    updatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("job", JobSchema);
