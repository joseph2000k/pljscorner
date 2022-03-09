const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
  },
  supplier: {
    type: String,
  },
  batchprice: {
    type: Number,
  },
  batchdate: {
    type: Date,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
