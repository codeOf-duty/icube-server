const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  startupName: {
    type: String,
    required: true,
    unique: true,
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
  isUser: {
    type: Boolean,
    required: true,
    default: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  domain: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
