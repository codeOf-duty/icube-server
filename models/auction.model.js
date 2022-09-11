const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "OPEN",
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startupName: {
      type: String,
      required: true,
    },
    bids: {
      type: Array,
      required: true,
    },
    vote: {
      type: Number,
      required: true,
      default: 0,
    },
    fundingTarget: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 30,
    },
    noOfBids: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", AuctionSchema);
