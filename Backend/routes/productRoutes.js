// Routes only say: "this URL + method -> run this controller function".
const express = require("express");
const { getAllProducts, getProductById } = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);       // GET /api/products
router.get("/:id", getProductById);    // GET /api/products/5

module.exports = router;