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
const PaymentMethod = require('../../models/PaymentMethod');
const User = require('../../models/User');
module.exports = {
    Query: {
        paymentMethods: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const currentUser = yield User.findById(user.id);
                if (!currentUser) {
                    return new Error('User Not Found');
                }
                const paymentmethods = yield PaymentMethod.find();
                return paymentmethods;
            }
            catch (err) {
                throw err;
            }
        }),
        paymentMethod: (_, { paymentMethod }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const paymentMethodName = yield PaymentMethod.findOne({ name: paymentMethod });
                if (!paymentMethodName) {
                    return new Error('Payment Method Not Found');
                }
                return paymentMethodName;
            }
            catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        addPaymentMethod(_, args, { user }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const currentUser = yield User.findById(user.id);
                    if (!currentUser) {
                        return new Error('User not found');
                    }
                    const newPaymentMethod = new PaymentMethod({
                        name: args.paymentMethodInput.name,
                        image: args.paymentMethodInput.image,
                    });
                    const paymentMethod = yield newPaymentMethod.save();
                    return paymentMethod;
                }
                catch (error) {
                    throw error;
                }
            });
        }
    }
};
