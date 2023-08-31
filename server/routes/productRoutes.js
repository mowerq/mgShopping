const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsByOwnerId,
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/owner/:id").get(getAllProductsByOwnerId);
router
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
