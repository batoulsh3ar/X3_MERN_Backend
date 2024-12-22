const express = require("express");
const Event = require("../models/Event");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById( req.params.id );
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post(
  "/",
  body("name")
    .isString()
    .withMessage("name should be a string")
    .notEmpty()
    .withMessage("name is required"),
  body("image")
    .isString()
    .withMessage("image should be a string")
    .notEmpty()
    .withMessage("image is required"),
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
      const event = new Event(req.body);

      await event.save();

      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  body("name")
    .isString().optional()
    .withMessage("name should be a string")
    ,
  body("image")
    .isString().optional()
    .withMessage("image should be a string")
    ,
  body("description")
    .isString().optional()
    .withMessage("description should be a string")
    ,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const event = await Event.findByIdAndUpdate(
         req.params.id ,
        {
          name: req.body.name,
          image: req.body.image,
          description: req.body.description,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!event) {
        return res.status(404).json({ message: "event not found" });
      }

      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete( req.params.id );

    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }

    res.status(200).json({ message: "event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
