const mongoose = require("mongoose");

const CareerHistorySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    startedDateMonth: {
      type: String,
      required: true,
    },
    startedDateYear: {
      type: String,
      required: true,
    },
    endedDateMonth: {
      type: String,
      required: true,
    },
    endedDateYear: {
      type: String,
      required: true,
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

module.exports = mongoose.model("career-history", CareerHistorySchema);
