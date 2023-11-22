const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    skills: {
      type: String,
    },
    job_applying: {
      type: String,
    },
    experience: {
      type: String,
    },
    rank: {
      type: Number,
    },
    how: {
      type: String,
    },
    jobId: {
      type: String,
    },
    actualJobPosted: {
      type: String,
    },
    pdfFile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("applicant", ApplicantSchema);
