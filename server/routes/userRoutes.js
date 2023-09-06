const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
  updateUser,
  createReview,
  updateCartByCurrentUser,
  getCartByCurrentUser,
  updateCurrentUser,
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.get("/current/cart", validateToken, getCartByCurrentUser);
router.post("/current/review/:productid", validateToken, createReview);
router.put("/current/cart", validateToken, updateCartByCurrentUser);
router.put("/current", validateToken, updateCurrentUser);
router.put("/:id", updateUser);

module.exports = router;
