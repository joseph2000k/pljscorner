"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
            itemId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Item',
                //required: true,
            },
            item: {
                type: String,
                ref: 'Item',
                //required: true,
            },
            quantity: {
                type: Number,
                //required: true,
            },
            price: {
                type: Number,
                //required: true,
            },
            discount: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'SaveMoreDiscount',
                    //required: true,
                }],
        }],
});
const Cart = (0, mongoose_1.model)('Cart', CartSchema);
module.exports = Cart;
