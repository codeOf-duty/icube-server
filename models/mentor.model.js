const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    organisation: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    availibility: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", MentorSchema);
