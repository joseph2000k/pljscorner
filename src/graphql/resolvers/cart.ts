const Cart = require('../../models/Cart');
const Item = require('../../models/Item');

module.exports = {
    Query: {
        getCart: async (_: void, args: {userId: string}) => {
            try {
                const cart = await Cart.findOne({user: args.userId}).populate('user');
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
                
                console.log(cart);
                console.log(item)
                if(!cart) {
                    return new Error('Cart not found');
                }
                if(!item) {
                    return new Error('Item not found');
                }

                //check if item is already in cart and update quantity in database
                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.cartInput);
                console.log(cartItem);
                if(cartItem) {
                    cartItem.quantity += 1;
                    cartItem.price += item.price;
                    await cart.save();
                    return cart;
                }

                cart.items.push({
                    itemId: item._id,
                    item: item.name,
                    quantity: 1,
                    price: item.price,
                });

                await cart.save();

                return cart;

            } catch (err) {
                return err;
            }
        }
    }
}
