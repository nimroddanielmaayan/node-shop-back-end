const moongoose = require("mongoose");

const productSchema = new moongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Product = moongoose.model("Product", productSchema);

module.exports = Product;
