const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = Product = mongoose.model('product', ProductSchema);
