const mongoose = require("mongoose");

const { Schema } = mongoose;

const investorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fcmToken: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  isInvestor: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Investor", investorSchema);
