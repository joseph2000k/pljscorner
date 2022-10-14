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
const Cart = require('../../models/Cart');
const Item = require('../../models/Item');
const BMSDiscount = require('../../models/BuyMoreAndSaveDiscount');
const SMDiscount = require('../../models/SaveMoreDiscount');
module.exports = {
    Query: {
        getCart: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cart = yield Cart.findOne({ user: args.userId });
                return cart;
            }
            catch (err) {
                throw err;
            }
        }),
        getTotal: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cart = yield Cart.findOne({ user: user.id });
                const items = cart.items;
                let total = 0;
                items.forEach((item) => {
                    total += item.price;
                });
                return total;
            }
            catch (err) {
                throw err;
            }
        }),
        numberOfItemsInCart: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cart = yield Cart.findOne({ user: user.id });
                const items = cart.items;
                let total = 0;
                items.forEach((item) => {
                    total += item.quantity;
                });
                return total;
            }
            catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        addToCart: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cart = yield Cart.findOne({ user: user.id });
                const item = yield Item.findById(args.cartInput);
                if (!cart) {
                    return new Error('Cart not found');
                }
                if (!item) {
                    return new Error('Item not found');
                }
                if (item.stock < 1) {
                    return new Error('Item out of stock');
                }
                /* const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.cartInput) */
                //find items in cart item where discount length is 0
                const cartItem = cart.items.find((item) => item.itemId.toString() === args.cartInput && item.discount.length === 0);
                if (!cartItem) {
                    cart.items.push({
                        itemId: item._id,
                        item: item.name,
                        quantity: 1,
                        price: item.price,
                    });
                }
                else {
                    cartItem.quantity += 1;
                    cartItem.price += item.price;
                }
                item.stock -= 1;
                yield item.save();
                yield cart.save();
                return cart;
            }
            catch (err) {
                return err;
            }
        }),
        addDiscountedItemToCart: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cart = yield Cart.findOne({ user: user.id });
                const item = yield Item.findById(args.item);
                const sMDiscount = yield SMDiscount.findOne({ items: args.item });
                /* let totalQuantityWithDiscount = 0;
                cart.items.forEach((item: { discount: any; quantity: number; }) => {
                    if(item.discount.length > 0) {
                        totalQuantityWithDiscount += item.quantity;
                    }
                }); */
                const discountedItems = cart.items.filter((item) => item.discount.length > 0);
                let itemsSaveValue = discountedItems.filter((item) => item.price === sMDiscount.saveValue);
                let itemsWithNoValue = discountedItems.filter((item) => item.price === 0);
                //console.log("this is itemsSaveVelue length", itemsSaveValue.length);
                let itemsDivisor = (discountedItems.length + 1) / sMDiscount.buy;
                //console.log("this is itemsDivisor", Math.floor(itemsDivisor));
                if (!cart) {
                    return new Error('Cart not found');
                }
                if (!item) {
                    return new Error('Item not found');
                }
                if (item.stock < 1) {
                    return new Error('Item out of stock');
                }
                //const remainder = (totalQuantityWithDiscount + 1) % sMDiscount.buy;
                let saveValueRemainder = (itemsWithNoValue.length + 1) % sMDiscount.buy;
                if (saveValueRemainder === 0 && Math.floor(itemsDivisor) > itemsSaveValue.length) {
                    //find last index in cart with discount.length > 0
                    cart.items.push({
                        itemId: item._id,
                        item: item.name + sMDiscount.title,
                        quantity: 1,
                        price: sMDiscount.saveValue,
                        discount: [sMDiscount._id]
                    });
                }
                else if (itemsSaveValue.length < Math.floor(itemsDivisor)) {
                    cart.items.push({
                        itemId: item._id,
                        item: item.name,
                        quantity: 1,
                        price: sMDiscount.saveValue,
                        discount: [sMDiscount._id]
                    });
                }
                else {
                    cart.items.push({
                        itemId: item._id,
                        item: item.name + sMDiscount.title,
                        quantity: 1,
                        price: 0,
                        discount: [sMDiscount._id]
                    });
                }
                //sort the last three items in cart with discount.length > 0
                cart.items.sort((a, b) => {
                    if (a.discount.length > 0 && b.discount.length > 0) {
                        return 0;
                    }
                    else if (a.discount.length > 0) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
                item.stock -= 1;
                yield item.save();
                yield cart.save();
                return cart;
            }
            catch (err) {
                return err;
            }
        }),
        removeFromCart: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cart = yield Cart.findOne({ user: user.id });
                const item = yield Item.findById(args.cartInput);
                if (!cart) {
                    return new Error('Cart not found');
                }
                if (!item) {
                    return new Error('Item not found');
                }
                const cartItem = cart.items.find((item) => item.itemId.toString() === args.cartInput && item.discount.length === 0);
                if (!cartItem) {
                    return new Error('Item not found in cart');
                }
                else if (cartItem) {
                    cartItem.price -= item.price;
                    cartItem.quantity -= 1;
                }
                else {
                    cartItem.quantity -= 1;
                    cartItem.price -= item.price;
                }
                if (cartItem.quantity < 1) {
                    //remove item from cart that discount length is 0
                    cart.items = cart.items.filter((item) => item.itemId.toString() !== args.cartInput || item.discount.length !== 0);
                }
                item.stock += 1;
                yield item.save();
                yield cart.save();
                return cart;
            }
            catch (err) {
                return err;
            }
        }),
        removeFromCartDiscount: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cart = yield Cart.findOne({ user: user.id });
                const item = yield Item.findById(args.cartInput);
                const sMDiscount = yield SMDiscount.findOne({ items: args.cartInput });
                if (!cart) {
                    return new Error('Cart not found');
                }
                if (!item) {
                    return new Error('Item not found');
                }
                const cartItem = cart.items.find((item) => item.itemId.toString() === args.cartInput && item.discount.length > 0);
                if (!cartItem) {
                    return new Error('Item not found in cart');
                }
                else if (cartItem) {
                    const discountedItems = cart.items.filter((item) => item.discount.length > 0);
                    let remainder = (discountedItems.length) % sMDiscount.buy;
                    //filter items in discountedItems where price is equal to sMDiscount.saveValue
                    let itemsSaveValue = discountedItems.filter((item) => item.price === sMDiscount.saveValue);
                    console.log("this is itemsSaveValue", itemsSaveValue.length);
                    let itemsDivisor = (discountedItems.length + 1) / sMDiscount.buy;
                    console.log("this is itemsDivisor", Math.floor(itemsDivisor));
                    let itemsWithNoValue = discountedItems.filter((item) => item.price === 0);
                    console.log("this is itemsWithNoValue", itemsWithNoValue.length);
                    const saveValueRemainder = (itemsWithNoValue.length) % sMDiscount.buy;
                    console.log("this is saveValueRemainder", saveValueRemainder);
                    console.log("this is item price", cartItem.price);
                    if (saveValueRemainder === 0 && cartItem.price === sMDiscount.saveValue) {
                        const id = cartItem._id;
                        cart.items = cart.items.filter((item) => item._id.toString() !== id.toString());
                        itemsWithNoValue[itemsWithNoValue.length - 1].price = sMDiscount.saveValue;
                    }
                    else if (saveValueRemainder !== 0 && cartItem.price === sMDiscount.saveValue) {
                        const id = cartItem._id;
                        cart.items = cart.items.filter((item) => item._id.toString() !== id.toString());
                    }
                    else if (saveValueRemainder === 0 && cartItem.price === 0) {
                        const id = cartItem._id;
                        cart.items = cart.items.filter((item) => item._id.toString() !== id.toString());
                        itemsWithNoValue[itemsWithNoValue.length - 1].price = 0;
                    }
                    else if (saveValueRemainder !== 0 && cartItem.price === 0) {
                        const id = cartItem._id;
                        cart.items = cart.items.filter((item) => item._id.toString() !== id.toString());
                    }
                }
                item.stock += 1;
                yield item.save();
                yield cart.save();
                return cart;
            }
            catch (err) {
                return err;
            }
        })
    }
};
