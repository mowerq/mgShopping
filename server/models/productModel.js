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
    category: {
      type: String,
      required: [true, "Please add the product category!"],
    },
    price: {
      type: Number,
      required: [true, "Please add the product price!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
