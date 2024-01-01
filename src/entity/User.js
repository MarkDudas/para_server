const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    position: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    personalSummary: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
