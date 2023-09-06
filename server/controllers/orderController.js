const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

//@desc Get an order with id
//@route GET /api/orders/:id
//@access public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }
  res.status(200).json(order);
});

module.exports = {
  getOrderById,
};
