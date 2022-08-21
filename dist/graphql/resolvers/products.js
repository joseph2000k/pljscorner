"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product = require("../../models/Product");
module.exports = {
    Query: {
        getProducts: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const products = yield Product.find();
                return products;
            }
            catch (err) {
                throw err;
            }
        }),
    },
    Mutation: {
        addProduct(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(args);
                const newProduct = new Product({
                    name: args.productInput.name,
                    price: args.productInput.price,
                    description: args.productInput.description,
                    sku: args.productInput.sku,
                });
                const result = yield newProduct.save();
                return result;
            });
        },
    },
};
