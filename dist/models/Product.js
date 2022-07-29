"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    sku: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
    },
});
const Product = (0, mongoose_1.model)('Product', ProductSchema);
module.exports = Product;
