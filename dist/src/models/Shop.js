"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShopSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    }
});
const Shop = (0, mongoose_1.model)('Shop', ShopSchema);
module.exports = Shop;
