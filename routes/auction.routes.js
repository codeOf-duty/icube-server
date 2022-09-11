const router = require("express").Router();
const Auction = require("../models/auction.model");

//CREATE POST
router.post("/", async (req, res) => {
  const newAuction = new Auction(req.body);
  try {
    const savedAuction = await newAuction.save();
    res.status(200).json(savedAuction);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Auction
router.put("/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (auction.username === req.body.username) {
      try {
        const updatedAuction = await Auction.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedAuction);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your Auction!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/bid/:id", async (req, res) => {
  const reasonPush = {
    bidAmount: req.body.bidAmount,
    bidderId: req.body.bidderId,
    bidderName: req.body.bidderName,
  };

  try {
    const auction = await Auction.findById(req.params.id);

    try {
      const updatedAuction = await Auction.findByIdAndUpdate(
        { _id: req.params.id },

        { $push: { bids: reasonPush }, $inc: { noOfBids: 1 } },

        { new: true }
      );

      res.status(200).json(updatedAuction);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Auction
router.delete("/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (auction.username === req.body.username) {
      try {
        await Auction.delete();
        res.status(200).json("Auction has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Auction!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Auction
router.get("/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    res.status(200).json(auction);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL AuctionS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let auctions;
    if (username) {
      auctions = await Auction.find({ username });
    } else if (catName) {
      auctions = await Auction.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      auctions = await Auction.find();
    }
    res.status(200).json(auctions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
