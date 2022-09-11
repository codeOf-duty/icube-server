const router = require("express").Router();
const Job = require("../models/job.model");

//CREATE POST
router.post("/", async (req, res) => {
  const newJob = new Job(req.body);
  try {
    const savedJob = await newJob.save();
    res.status(200).json(savedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Job
router.put("/:id", async (req, res) => {
  try {
    const Job = await Job.findById(req.params.id);
    if (Job.username === req.body.username) {
      try {
        const updatedJob = await Job.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedJob);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your Job!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Job
router.delete("/:id", async (req, res) => {
  try {
    const Job = await Job.findById(req.params.id);
    if (Job.username === req.body.username) {
      try {
        await Job.delete();
        res.status(200).json("Job has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Job!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Job
router.get("/:id", async (req, res) => {
  try {
    const jobs = await Job.findById(req.params.id);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL JobS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Jobs;
    if (username) {
      Jobs = await Job.find({ username });
    } else if (catName) {
      Jobs = await Job.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Jobs = await Job.find();
    }
    res.status(200).json(Jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
