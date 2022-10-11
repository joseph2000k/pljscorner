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
const buyMoreAndSaveDiscount = require('../../models/BuyMoreAndSaveDiscount');
module.exports = {
    Query: {
        getBMSDiscounts: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const discounts = yield buyMoreAndSaveDiscount.find();
                return discounts;
            }
            catch (err) {
                throw err;
            }
        }),
        getBMSDiscount: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const discount = yield buyMoreAndSaveDiscount.findById(args.discountId);
                return discount;
            }
            catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        addBMSDiscount: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const discount = new buyMoreAndSaveDiscount({
                    item: args.discountInput.item,
                    buy: args.discountInput.buy,
                    saveValue: args.discountInput.saveValue,
                    activated: args.discountInput.activated
                });
                const result = yield discount.save();
                const findResult = yield buyMoreAndSaveDiscount.findById(result._id).populate('item');
                return findResult;
            }
            catch (err) {
                throw err;
            }
        })
    }
};
