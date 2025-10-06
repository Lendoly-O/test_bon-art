// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: Number,           // tu peux utiliser Number si tu veux tes propres IDs
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  warranty_years: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
