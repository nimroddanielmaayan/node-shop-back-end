/* Imports and setup */

// Import libraries
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Configure dotenv
dotenv.config({ path: "./config.env" });

// Initialize app
const app = express();

// Import files
const Product = require("./models/productModel");

/* Add middleware (runs between req and res) */

// Serve static files to client
app.use(express.static(`${__dirname}/public`));

// Parse req data to JSON
app.use(express.json());

// Log req basic data to console
app.use(morgan("dev"));

/* API Routes */

// Get all products
app.get("/api/v1/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
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

/* Database and server */

// Connect to database
dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(process.env.CONNECT_DB);
  console.log("Connected to database");
}

// Server
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
