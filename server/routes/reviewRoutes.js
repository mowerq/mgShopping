const express = require("express");
const router = express.Router();
const {
  createReview,
  deleteReview,
} = require("../controllers/reviewController");

router.route("/:userid/:productid").post(createReview);
router.route("/:id").delete(deleteReview);

module.exports = router;
