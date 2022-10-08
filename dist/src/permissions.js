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
exports.permissions = void 0;
const graphql_shield_1 = require("graphql-shield");
const User = require('./models/User');
const isAdmin = (0, graphql_shield_1.rule)({ cache: 'contextual' })((parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(ctx.user.id);
    return user.role === 'admin';
}));
const isUser = (0, graphql_shield_1.rule)({ cache: 'contextual' })((parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(ctx.user.id);
    return user.role === 'user';
}));
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        viewer: (0, graphql_shield_1.or)(isAdmin, isUser),
        paymentMethods: (0, graphql_shield_1.or)(isAdmin, isUser),
        user: isAdmin,
        shops: (0, graphql_shield_1.or)(isAdmin, isUser),
        getItems: (0, graphql_shield_1.or)(isAdmin, isUser),
        getItemsByCategory: (0, graphql_shield_1.or)(isAdmin, isUser),
        getCategory: (0, graphql_shield_1.or)(isAdmin, isUser),
        hello: graphql_shield_1.allow,
        getCart: (0, graphql_shield_1.or)(isAdmin, isUser),
        getTotal: (0, graphql_shield_1.or)(isAdmin, isUser),
        receipts: (0, graphql_shield_1.or)(isAdmin, isUser),
        receipt: (0, graphql_shield_1.or)(isAdmin, isUser),
        getBMSDiscount: (0, graphql_shield_1.or)(isAdmin, isUser),
        getBMSDiscounts: (0, graphql_shield_1.or)(isAdmin, isUser),
        getSMDiscounts: (0, graphql_shield_1.or)(isAdmin, isUser),
        numberOfItemsInCart: (0, graphql_shield_1.or)(isAdmin, isUser),
        viewDiscountedItems: (0, graphql_shield_1.or)(isAdmin, isUser)
    },
    Mutation: {
        register: graphql_shield_1.allow,
        addPaymentMethod: isAdmin,
        addShop: isAdmin,
        addItem: isAdmin,
        singleUpload: isAdmin,
        receipt: (0, graphql_shield_1.or)(isAdmin, isUser),
        addToCart: (0, graphql_shield_1.or)(isAdmin, isUser),
        removeFromCart: (0, graphql_shield_1.or)(isAdmin, isUser),
        removeFromCartDiscount: (0, graphql_shield_1.or)(isAdmin, isUser),
        addBMSDiscount: isAdmin,
        createSMDiscount: isAdmin,
        addSMDItem: isAdmin,
        addDiscountedItemToCart: (0, graphql_shield_1.or)(isAdmin, isUser)
    }
});
