require("dotenv").config();

const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Only let YOUR React app (and not random websites) call this API from a browser
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

// Lets us read JSON sent in request bodies (needed later for login, orders, etc.)
app.use(express.json());

// Step 3 test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the ShopEase API!" });
});

// Everything starting with /api/products is handled by productRoutes
app.use("/api/products", productRoutes);

// If no route above matched
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// If any code throws an unexpected error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`🚀 ShopEase API running at http://localhost:${PORT}`);
});