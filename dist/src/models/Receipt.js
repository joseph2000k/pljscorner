"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReceiptSchema = new mongoose_1.Schema({
    cashier: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        //required: true,
    },
    total: {
        type: Number,
        //required: true,
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
    cash: {
        type: Number,
        //required: true,
    },
    change: {
        type: Number,
        //required: true,
    },
    receiptnumber: {
        type: Number,
        //required: true,
    },
    shop: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Shop',
        //required: true,
    },
    date: {
        type: Date,
        //required: true,
    },
    time: {
        type: Date,
        //required: true,
    },
    tax: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tax',
    },
    discount: {
        type: Number,
    },
    paymentmethod: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        //required: true,
    },
    referencenumber: {
        type: Number
    }
});
const Receipt = (0, mongoose_1.model)('Receipt', ReceiptSchema);
module.exports = Receipt;
