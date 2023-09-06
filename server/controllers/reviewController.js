const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

//@desc Create a review
//@route POST /api/reviews/:userid/:productid
//@access public
const createReview = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { numStars, comment } = req.body;
  if (!numStars || !comment) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  try {
    const review = await Review.create({
      numStars,
      comment,
      ownerId: req.params.userid,
      productId: req.params.productid,
    });
    const product = await Product.findById(req.params.productid);
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }
    product.avgStars =
      (product.avgStars + numStars) / (product.reviews.length + 1);
    await product.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400);
    throw new Error(`Validation Error: ${err.message}`);
  }
});

//@desc Delete a review
//@route DELETE /api/reviews/:id
//@access public
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found!");
  }
  await Review.deleteOne(review);
  res.status(200).json({ message: `Delete the review ${req.params.id}` });
});

module.exports = {
  createReview,
  deleteReview,
};
