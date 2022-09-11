const router = require("express").Router();
const Mentor = require("../models/mentor.model");

//CREATE Mentor
router.post("/", async (req, res) => {
  const newMentor = new Mentor(req.body);
  try {
    const savedMentor = await newMentor.save();
    res.status(200).json(savedMentor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Mentor
router.put("/:id", async (req, res) => {
  try {
    const Mentor = await Mentor.findById(req.params.id);
    if (Mentor.username === req.body.username) {
      try {
        const updatedMentor = await Mentor.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMentor);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your Mentor!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Mentor
router.delete("/:id", async (req, res) => {
  try {
    const Mentor = await Mentor.findById(req.params.id);
    if (Mentor.username === req.body.username) {
      try {
        await Mentor.delete();
        res.status(200).json("Mentor has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Mentor!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Mentor
router.get("/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Mentor by city
router.get("/:industry/:city", async (req, res) => {
  const industry = req.params.industry;
  const city = req.params.city;
  try {
    const mentor = await Mentor.find({
      $and: [{ industry: industry }, { city: city }],
    });
    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL MentorS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Mentors;
    if (username) {
      Mentors = await Mentor.find({ username });
    } else if (catName) {
      Mentors = await Mentor.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Mentors = await Mentor.find();
    }
    res.status(200).json(Mentors);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
