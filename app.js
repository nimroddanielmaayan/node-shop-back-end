/* Imports and configs */

// Import libraries
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Configure dotenv
dotenv.config({ path: "./config.env" });

// Import files
// (complete later)

/* Constants */

// Start server
const app = express();
const port = 3000;

/* Middleware (runs between req and res) */

// Serve static files
app.use(express.static(`${__dirname}/public`));

// Parse req data to JSON
app.use(express.json());

// Log req data
app.use(morgan("dev"));

// Example custom middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

/* API Routes */

// Get all products
app.get("/api/v1/products", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      products: "no products, no database yet",
    },
  });
});

// Create a product
app.post("/api/v1/products", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: "product not created, no database yet",
    },
  });
});

// Modify a product
app.patch("/api/v1/products", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: "product not modified, no database yet",
    },
  });
});

// Delete all products (I think... Check this later)
app.delete("/api/v1/products", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      product: "products not deleted, no database yet",
    },
  });
});

// Get a product by id
app.get("/api/v1/products/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      requestId: req.params.id,
      products: "product not found, no database yet",
    },
  });
});

// Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
