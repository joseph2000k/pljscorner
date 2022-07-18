"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    createdAt: {
        type: String,
    },
});
const User = (0, mongoose_1.model)('User', UserSchema);
module.exports = User;