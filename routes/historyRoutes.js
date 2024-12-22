const express = require("express");
const History = require("../models/History");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:date", async (req, res) => {
  try {
    const history = await History.find({ date: req.params.date });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post(
  "/",
  body("date")
    .isInt({ min: 2005 })
    .withMessage("date must be a year and at least 2005"),
  body("title")
    .isString()
    .withMessage("title should be a string")
    .notEmpty()
    .withMessage("title is required"),
  body("description")
    .isString()
    .withMessage("description should be a string")
    .notEmpty()
    .withMessage("description is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const history = new History(req.body);

      await history.save();

      res.status(201).json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/:date",
  body("title")
    .isString()
    .withMessage("title should be a string")
    .notEmpty()
    .withMessage("title is required"),
  body("description")
    .isString()
    .withMessage("description should be a string")
    .notEmpty()
    .withMessage("description is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const history = await History.findOneAndUpdate(
        { date: req.params.date },
        { title: req.body.title, description: req.body.description },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!history) {
        return res.status(404).json({ message: "History not found" });
      }

      res.status(200).json(history);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete("/:date", async (req, res) => {
  try {
    const history = await History.findOneAndDelete({ date: req.params.date });

    if (!history) {
      return res.status(404).json({ message: "History not found" });
    }

    res.status(200).json({ message: "History deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
