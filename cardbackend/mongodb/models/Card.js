const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {
    cname: {
      type: String,
      required: true,
    },
    clink: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const cardModel = mongoose.model("cardModel", cardSchema);

module.exports = cardModel;
