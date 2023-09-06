const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  numStars: {
    type: Number,
    required: [true, "Number of stars is important"],
  },
  comment: {
    type: String,
    required: [true, "Please enter a comment to your review"],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
