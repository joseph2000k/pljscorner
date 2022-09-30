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
const Receipt = require('../../models/Receipt');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
module.exports = {
    Query: {
        receipts: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const role = yield User.findById(user.id).select('role');
                if (role.role === 'admin') {
                    return yield Receipt.find().sort({ date: -1 }).populate('cashier', 'username');
                }
                else {
                    return yield Receipt.find({ cashier: user.id }).sort({ date: -1 }).populate('cashier', 'username');
                }
            }
            catch (err) {
                throw err;
            }
        }),
        receipt: (_, { receiptId }, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const role = yield User.findById(user.id).select('role');
                if (role.role === 'admin') {
                    return yield Receipt.findById(receiptId).populate('cashier', 'username').populate('paymentmethod', 'name');
                }
                const receipt = yield Receipt.findById(receiptId).populate('cashier', 'username').populate('paymentmethod', 'name');
                if (receipt.cashier.id === user.id) {
                    return receipt;
                }
                else {
                    return new Error('Unauthorized');
                }
            }
            catch (err) {
                throw err;
            }
        }),
    },
    Mutation: {
        receipt: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            const { total, items, cash, paymentmethod, referencenumber } = args.receiptInput;
            const cart = yield Cart.findOne({ user: user.id });
            if (!cart) {
                return new Error('Cart not found');
            }
            if (!cash) {
                return new Error('Cash is required');
            }
            if (cash < total) {
                return new Error('Cash is less than total');
            }
            const transaction = {
                change: cash - total,
                cash,
                total,
                items,
                cashier: user.id,
                date: new Date().toISOString(),
                time: new Date().toISOString(),
                receiptnumber: Math.floor(Math.random() * 1000000000),
                paymentmethod,
                referencenumber,
            };
            const newReceipt = new Receipt(Object.assign({}, transaction));
            const receipt = yield newReceipt.save();
            cart.items = [];
            yield cart.save();
            return receipt;
        })
    }
};
