const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    jobDesc: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    jobType: {
      type: String,
      required: true,
    },
    startupName: {
      type: String,
      required: true,
    },
    jobLink: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
