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
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/categories/:category").get(getAllProductsByCategory);
router.route("/owner/:id").get(getAllProductsByOwnerId);
router
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
