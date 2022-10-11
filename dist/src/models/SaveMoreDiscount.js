"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SaveMoreDiscountSchema = new mongoose_1.Schema({
    items: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Item',
            //required: true,
        }],
    title: {
        type: String,
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
const SaveMoreDiscount = (0, mongoose_1.model)('SaveMoreDiscount', SaveMoreDiscountSchema);
module.exports = SaveMoreDiscount;
