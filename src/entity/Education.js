const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    yearCompleted: {
      type: String,
      required: true,
    },
    courseHighlight: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("education", EducationSchema);
