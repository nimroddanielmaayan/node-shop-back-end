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

// Get a product by id
app.get("/api/v1/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        requestId: req.params.id,
        product,
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
app.post("/api/v1/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

// Modify a product
app.patch("/api/v1/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

// Delete all products
app.delete("/api/v1/products", async (req, res) => {
  try {
    await Product.deleteMany();
    const products = await Product.find();
    res.status(204).json({
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

// Delete product by id
app.delete("/api/v1/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
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
