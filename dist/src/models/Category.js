"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    categoryName: {
        type: String,
    }
});
const Category = (0, mongoose_1.model)('Category', CategorySchema);
module.exports = Category;
