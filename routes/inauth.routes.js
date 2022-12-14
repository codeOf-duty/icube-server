const express = require("express");
const bcrypt = require("bcrypt");
const Investor = require("../models/investor.model");
const generateAuthToken = require("../utils/generateAuthToken");
const verifyAuthentication = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await Investor.findOne({ email });
    if (foundUser) {
      return res.status(400).json({
        message: "User with this email already exists.",
      });
    } else {
      const user = await new Investor(req.body);
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      const token = generateAuthToken(user._id);

      return res.status(201).json({
        message: "User created successfully.",
        response: {
          name: user.name,
          organisation: user.organisation,
          token,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await Investor.findById(req.params.id);
    if (user.username === req.body.username) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your User!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await Investor.findOne({ email });
    if (!foundUser) {
      return res.status(403).json({
        message: "Incorrect email or password!",
      });
    } else {
      const isPasswordValid = bcrypt.compare(password, foundUser.password);
      if (!isPasswordValid) {
        return res.status(403).json({
          message: "Incorrect email or password.",
        });
      }

      const token = generateAuthToken(foundUser._id);

      return res.status(200).json({
        message: "Logged in successfully.",
        response: {
          token,
          name: foundUser.name,
          email: foundUser.email,
          organisation: foundUser.organisation,
          isInvestor: foundUser.isInvestor,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.get("/self", verifyAuthentication, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      response: {
        email: user.email,
        name: user.name,
      },
      message: "Successfully fetched user info.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;
