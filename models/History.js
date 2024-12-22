const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
      unique:true
    },
  }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
