const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
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

//@desc Get one product
//@route GET /api/products/:id
//@access public
const getOneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  res.status(200).json(product);
});

//@desc Create a product
//@route POST /api/products/
//@access public
const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { category, name, price, ownerId } = req.body;
  if (!category || !name || !price || !ownerId) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  try {
    const product = await Product.create({
      category,
      name,
      price,
      ownerId,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400);
    throw new Error(`Validation Error: ${error.message}`);
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
};
