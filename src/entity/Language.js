const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("language", LanguageSchema);
