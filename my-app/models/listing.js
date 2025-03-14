const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String, // Image file path or URL
  seller: String,
  date: String, 
  category: String,
});

module.exports = mongoose.model("Listing", listingSchema);
