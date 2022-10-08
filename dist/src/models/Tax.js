"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaxSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
});
const Tax = (0, mongoose_1.model)('Tax', TaxSchema);
module.exports = Tax;
