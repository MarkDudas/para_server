const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("skills", SkillSchema);
