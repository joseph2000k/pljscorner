const Cart = require('../../models/Cart');
const Item = require('../../models/Item');

module.exports = {
    Query: {
        getCart: async (_: void, args: {userId: string}) => {
            try {
                const cart = await Cart.findOne({user: args.userId});
                return cart;
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

                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.cartInput);
             
               
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

                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.cartInput);
             
               
                if(!cartItem) {
                    return new Error('Item not found in cart');
                } else {
                    cartItem.quantity -= 1;
                    cartItem.price -= item.price;
                }

                if(cartItem.quantity < 1) {
                    cart.items = cart.items.filter((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() !== args.cartInput);
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
