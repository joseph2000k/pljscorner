"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentMethodSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    qr: {
        type: String,
    }
});
const PaymentMethod = (0, mongoose_1.model)('PaymentMethod', PaymentMethodSchema);
module.exports = PaymentMethod;
