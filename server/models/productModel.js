const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There need to be an owner for every product!"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the product name!"],
    },
    ownerName: {
      type: String,
      required: [true, "Please add the owner name!"],
    },
    category: {
      type: String,
      required: [true, "Please add the product category!"],
    },
    price: {
      type: Number,
      required: [true, "Please add the product price!"],
    },
    features: {
      type: [String],
      default: [],
    },
    imgUrl: {
      type: String,
      required: [true, "Please enter an image url"],
    },
    reviews: {
      type: [
        {
          reviewOwnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
            default: "",
          },
          numStars: {
            type: Number,
            required: [true, "Please select stars"],
          },
          reviewOwnerName: {
            type: String,
            default: "Unknown",
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      default: [],
    },
    avgStars: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
