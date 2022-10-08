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
const SaveMoreDiscount = require('../../models/SaveMoreDiscount');
module.exports = {
    Query: {
        getSMDiscounts: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const discounts = yield SaveMoreDiscount.find().populate('items');
                return discounts;
            }
            catch (err) {
                throw err;
            }
        }),
        viewDiscountedItems: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const discount = yield SaveMoreDiscount.findById(args.discountId);
                return discount;
            }
            catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        createSMDiscount: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("here");
            try {
                const discount = new SaveMoreDiscount({
                    items: args.discountInput.items,
                    title: args.discountInput.title,
                    buy: args.discountInput.buy,
                    saveValue: args.discountInput.saveValue,
                    activated: args.discountInput.activated
                });
                const result = yield discount.save();
                const findResult = yield SaveMoreDiscount.findById(result._id).populate('items');
                return findResult;
            }
            catch (err) {
                throw err;
            }
        }),
        addSMDItem: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const discount = yield SaveMoreDiscount.findById(args.discountId).populate('items');
                const item = discount.items.find((item) => item._id == args.item);
                if (item) {
                    return new Error('Item already exists');
                }
                yield discount.items.push(args.item);
                yield discount.save();
                console.log(discount);
                return discount;
            }
            catch (err) {
                throw err;
            }
        }),
    }
};
