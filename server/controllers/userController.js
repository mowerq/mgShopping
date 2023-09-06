const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, favorites, reviews } = req.body;
    if (!name || !email || !password || !favorites || !reviews) {
      res.status(400);
      throw new Error("All fields are mandatory while registering");
    }
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      favorites,
      reviews,
    });
    console.log(user);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User data is not valid!");
    }
  } catch (error) {
    console.log(error);
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
          cart: user.cart,
          orders: user.orders,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
      /*{ expiresIn: "60m" }*/
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid!");
  }
});

//@desc Update a user
//@route PUT /api/users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Product not found!");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

//@desc Update current user
//@route PUT /api/users/current
//@access public
const updateCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const updatedUserData = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

//@desc Current user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//@desc Get orders of current user
//@route GET /api/users/current/orders
//@access public
const getOrdersByCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate("orders.orderId");
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const orders = user.orders.map((order) => order.orderId);

  res.json(orders);
});

//@desc Get cart of current user
//@route GET /api/users/current/cart
//@access public
const getCartByCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("cart");

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  res.json(user.cart);
});

//@desc Update cart of current user
//@route PUT /api/users/current/cart
//@access public
const updateCartByCurrentUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    user.cart.products = products;
    let totalCost = 0;
    for (let i = 0; i < products.length; i++) {
      totalCost += products[i].productPrice * products[i].quantity;
    }
    user.cart.totalCost = totalCost;
    console.log(user.cart.products);
    console.log(user.cart.products);

    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.log(error);
  }
});

//@desc Create a review with current user
//@route POST /api/users/current/review/:productid
//@access public
const createReview = asyncHandler(async (req, res) => {
  try {
    const { productid } = req.params;
    const { numStars, comment } = req.body;
    const user = await User.findById(req.user.id);
    const product = await Product.findById(productid);
    product.avgStars =
      (product.avgStars * product.reviews.length + numStars) /
      (product.reviews.length + 1);
    product.reviews.push({
      numStars,
      comment,
      reviewOwnerName: user.name,
      reviewOwnerId: user.id,
    });
    user.reviews.push({
      productId: productid,
      comment,
      numStars,
    });

    await user.save();
    await product.save();
    res.status(201).json({
      numStars,
      comment,
      reviewOwnerId: user.id,
    });
  } catch (error) {
    console.log(error);
  }
});
/*
//@desc Create a review with current user
//@route POST /api/users/current/review/:productid
//@access public
const addToFavorites = asyncHandler(async (req, res) => {

});
*/
module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getOrdersByCurrentUser,
  updateUser,
  getCartByCurrentUser,
  updateCartByCurrentUser,
  createReview,
  updateCurrentUser,
};
