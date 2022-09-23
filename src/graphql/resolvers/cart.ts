const Cart = require('../../models/Cart');
const Item = require('../../models/Item');
const BMSDiscount = require('../../models/BuyMoreAndSaveDiscount');
const SMDiscount = require('../../models/SaveMoreDiscount');

module.exports = {
    Query: {
        getCart: async (_: void, args: {userId: string}) => {
            try {
                const cart = await Cart.findOne({user: args.userId});
                return cart;
            } catch (err) {
                throw err;
            }
        },
        getTotal: async (_: void, args: void, {user}: any) => {
            try {
                const cart = await Cart.findOne({user: user.id});
                const items = cart.items;
                let total = 0;
                items.forEach((item: {item: string, quantity: number, price: number}) => {
                    total += item.price;
                });
                return total;
            } catch (err) {
                throw err;
            }
        },
        numberOfItemsInCart: async (_: void, args: void, {user}: any) => {
            try {
                const cart = await Cart.findOne({user: user.id});
                const items = cart.items;
                let total = 0;
                items.forEach((item: {item: string, quantity: number, price: number}) => {
                    total += item.quantity;
                });
                return total;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        addToCart: async (_: void, args: {cartInput: string}, {user}: any) => {
            try {
                const cart = await Cart.findOne({user: user.id});
                const item = await Item.findById(args.cartInput);
                
                if(!cart) {
                    return new Error('Cart not found');
                }
                if(!item) {
                    return new Error('Item not found');
                }
                if(item.stock < 1) {
                    return new Error('Item out of stock');
                }

                /* const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.cartInput) */

                //find items in cart item where discount length is 0
                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; discount: { length: number; }; }) => item.itemId.toString() === args.cartInput && item.discount.length === 0);

                
                if(!cartItem) {
                    cart.items.push({
                        itemId: item._id,
                        item: item.name,
                        quantity: 1,
                        price: item.price,
                    });
                } else {
                    cartItem.quantity += 1;
                    cartItem.price += item.price;
                }

                
                item.stock -= 1;

                await item.save();

                await cart.save();

                return cart;

            } catch (err) {
                return err;
            }
        },
        addDiscountedItemToCart: async (_: void, args: {item: string}, {user}: any) => {
            try {
                const cart = await Cart.findOne({user: user.id});
                const item = await Item.findById(args.item);
                const sMDiscount = await SMDiscount.findOne({items: args.item});

                let totalQuantityWithDiscount = 0;
                cart.items.forEach((item: { discount: any; quantity: number; }) => {
                    if(item.discount.length > 0) {
                        totalQuantityWithDiscount += item.quantity;
                    }
                });

                
                if(!cart) {
                    return new Error('Cart not found');
                }
                if(!item) {
                    return new Error('Item not found');
                }
                if(item.stock < 1) {
                    return new Error('Item out of stock');
                }

                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.item);

                
                    cart.items.push({
                        itemId: item._id,
                        item: item.name + sMDiscount.title,
                        quantity: 1,
                        price: 0,
                        discount: [sMDiscount._id]
                    });

                const remainder = (totalQuantityWithDiscount + 1) % sMDiscount.buy;
               
                if(remainder === 0) {
                    //find last index in cart with discount.length > 0
                    const lastItemWithDiscount = cart.items.length - 1;
                    cart.items[lastItemWithDiscount].price = sMDiscount.saveValue;
                }


                //sort the last three items in cart with discount.length > 0
                cart.items.sort((a: { discount: any; }, b: { discount: any; }) => {
                    if(a.discount.length > 0 && b.discount.length > 0) {
                        return 0;
                    } else if(a.discount.length > 0) {
                        return -1;
                    } else {
                        return 1;
                    }
                });

                
                item.stock -= 1;

                await item.save();

                await cart.save();

                return cart;

            } catch (err) {
                return err;
            }
        },
        removeFromCart: async (_: void, args: {cartInput: string}, {user}: any) => {
            try {
                const cart = await Cart.findOne({user: user.id});
                const item = await Item.findById(args.cartInput);
                
                
                if(!cart) {
                    return new Error('Cart not found');
                }
                if(!item) {
                    return new Error('Item not found');
                }

                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; discount: { length: number; }; }) => item.itemId.toString() === args.cartInput && item.discount.length === 0);

                
             
               
                if(!cartItem) {
                    return new Error('Item not found in cart');
                } else if(cartItem) {
                    cartItem.price -= item.price;
                    cartItem.quantity -= 1;
                }
                else {
                    cartItem.quantity -= 1;
                    cartItem.price -= item.price;
                }

                if(cartItem.quantity < 1) {
                    //remove item from cart that discount length is 0
                    cart.items = cart.items.filter((item: { itemId: { toString: () => string; }; discount: { length: number; }; }) => item.itemId.toString() !== args.cartInput || item.discount.length !== 0);
                }


                item.stock += 1;

                await item.save();

                await cart.save();

                return cart;


            } catch (err) {
                return err;
            }
        },
        removeFromCartDiscount: async (_: void, args: {cartInput: string}, {user}: any) => {
            try {
                const cart = await Cart.findOne({user: user.id});
                const item = await Item.findById(args.cartInput);
                
                
                if(!cart) {
                    return new Error('Cart not found');
                }
                if(!item) {
                    return new Error('Item not found');
                }

                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; discount: { length: number; }; }) => item.itemId.toString() === args.cartInput && item.discount.length > 0);
                
             
                if(!cartItem) {
                    return new Error('Item not found in cart');
                } else if(cartItem) {
                    //get _id of the item
                    const id = cartItem._id;
                    //remove the item with the id
                    cart.items = cart.items.filter((item: { _id: { toString: () => string; }; }) => item._id.toString() !== id.toString());
                }

                item.stock += 1;

                await item.save();

                await cart.save();

                return cart;


            } catch (err) {
                return err;
            }
        }
    }
}
