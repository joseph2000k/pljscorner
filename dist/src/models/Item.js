"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    sku: {
        type: String,
    },
    barcode: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: "",
    }
});
const Item = (0, mongoose_1.model)('Item', ItemSchema);
module.exports = Item;
