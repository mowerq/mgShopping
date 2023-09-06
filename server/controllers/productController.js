const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { json } = require("express");
const mongoose = require("mongoose");
//const User = require()

//@desc Get all products
//@route GET /api/products
//@access public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

//@desc Get all products by owner Id
//@route GET /api/products/owner/:id
//@access public
const getAllProductsByOwnerId = asyncHandler(async (req, res) => {
  const products = await Product.find({ ownerId: req.params.id });
  res.status(200).json(products);
});

//@desc Get all products by category
//@route GET /api/products/categories/:category
//@access public
const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.status(200).json(products);
});

//@desc Get one product
//@route GET /api/products/:id
//@access public
const getOneProduct = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const product = await Product.findById(req.params.id);
    console.log("PRODUCT: ", product);
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

//@desc Create a product
//@route POST /api/products/
//@access public
const createProduct = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
  const { category, name, price, ownerId, ownerName, features, imgUrl } =
    req.body;
  if (
    !category ||
    !name ||
    !price ||
    !ownerId ||
    !features ||
    !imgUrl ||
    !ownerName
  ) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  try {
    const product = await Product.create({
      category,
      name,
      price,
      ownerId,
      ownerName,
      features,
      imgUrl,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400);
    throw new Error(`Validation Error: ${err.message}`);
  }
});

//@desc Update a product
//@route PUT /api/products/:id
//@access public
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
});

//@desc Delete a product
//@route DELETE /api/products/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  await Product.deleteOne(product);
  res.status(200).json({ message: `Delete the product ${req.params.id}` });
});

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsByOwnerId,
  getAllProductsByCategory,
};
