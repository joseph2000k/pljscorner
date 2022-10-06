"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/* export interface BuyMoreAndSaveDiscount {
    name: string;
    value: number;
} */
const DiscountSchema = new mongoose_1.Schema({
    item: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Item',
        //required: true,
    },
    buy: {
        type: Number,
        //required: true,
    },
    saveValue: {
        type: Number,
        //required: true,
    },
    activated: {
        type: Boolean,
        default: false,
        //required: true,
    },
});
const BuyMoreAndSaveDiscount = (0, mongoose_1.model)('BuyMoreAndSaveDiscount', DiscountSchema);
module.exports = BuyMoreAndSaveDiscount;
