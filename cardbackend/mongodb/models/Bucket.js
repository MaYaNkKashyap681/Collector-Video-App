const mongoose = require("mongoose");

const bucketSchema = mongoose.Schema(
  {
    bname: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    cards: [{ type: "ObjectId", ref: "cardModel" }],
    user: {
      type: "ObjectId",
      ref: "userModel",
      default: null
    },
  },
  { timestamps: true }
);

const bucketModel = mongoose.model("bucketModel", bucketSchema);

module.exports = bucketModel;
