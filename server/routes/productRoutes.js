const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsByOwnerId,
  getAllProductsByCategory,
  searchProducts,
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/search/:word").get(searchProducts);
router.route("/categories/:category").get(getAllProductsByCategory);
router.route("/owner/:id").get(getAllProductsByOwnerId);
router
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
