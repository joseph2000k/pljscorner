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

                /* let totalQuantityWithDiscount = 0;
                cart.items.forEach((item: { discount: any; quantity: number; }) => {
                    if(item.discount.length > 0) {
                        totalQuantityWithDiscount += item.quantity;
                    }
                }); */

                const discountedItems = cart.items.filter((item: { discount: { length: number; }; }) => item.discount.length > 0);

                let itemsSaveValue = discountedItems.filter((item: { price: number; }) => item.price === sMDiscount.saveValue);
                
                let itemsWithNoValue = discountedItems.filter((item: { price: number; }) => item.price === 0);
                //console.log("this is itemsSaveVelue length", itemsSaveValue.length);
    
                let itemsDivisor = (discountedItems.length + 1) / sMDiscount.buy;
                

                //console.log("this is itemsDivisor", Math.floor(itemsDivisor));
                
                if(!cart) {
                    return new Error('Cart not found');
                }
                if(!item) {
                    return new Error('Item not found');
                }
                if(item.stock < 1) {
                    return new Error('Item out of stock');
                }


                //const remainder = (totalQuantityWithDiscount + 1) % sMDiscount.buy;

                let saveValueRemainder = (itemsWithNoValue.length + 1) % sMDiscount.buy;
               
               
                if(saveValueRemainder === 0 && Math.floor(itemsDivisor) > itemsSaveValue.length) {
                    //find last index in cart with discount.length > 0
                    cart.items.push({
                        itemId: item._id,
                        item: item.name + sMDiscount.title,
                        quantity: 1,
                        price: sMDiscount.saveValue,
                        discount: [sMDiscount._id]
                    });
                } else if ( itemsSaveValue.length  < Math.floor(itemsDivisor)){
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
                const sMDiscount = await SMDiscount.findOne({items: args.cartInput});
                
                
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
                    


                    const discountedItems = cart.items.filter((item: { discount: { length: number; }; }) => item.discount.length > 0);
                
                    let remainder = (discountedItems.length) % sMDiscount.buy;
    
    
                    //filter items in discountedItems where price is equal to sMDiscount.saveValue
                    let itemsSaveValue = discountedItems.filter((item: { price: number; }) => item.price === sMDiscount.saveValue);
    
    
                    let itemsDivisor = (discountedItems.length + 1) / sMDiscount.buy;

                    let itemsWithNoValue = discountedItems.filter((item: { price: number; }) => item.price === 0);
                    console.log("this is itemsWithNoValue", itemsWithNoValue.length);
                    const saveValueRemainder = (itemsWithNoValue.length ) % sMDiscount.buy;
                    console.log("this is saveValueRemainder", saveValueRemainder-1);
                    console.log("this is item price", cartItem.price)


                    if(saveValueRemainder-1 <= 0 && cartItem.price === sMDiscount.saveValue) {
                        console.log('remainder is 0');
                        //set price to saveValue
                        itemsWithNoValue[itemsWithNoValue.length - 1].price = sMDiscount.saveValue;
                    } else if(itemsSaveValue.length  < Math.floor(itemsDivisor) && cartItem.price !== sMDiscount.saveValue){
                        console.log('itemsSaveValue.length  < Math.floor(itemsDivisor)');
                        //set price to saveValue
                        itemsWithNoValue[itemsWithNoValue.length - 1].price = sMDiscount.saveValue;
                    }
                    else {
                        //set price to 0
                        discountedItems[discountedItems.length - 1].price = 0;
                    }
                    
                }
                /* if(itemsSaveValue.length === Math.floor(itemsDivisor) && remainder === 0) {
                    //set last item in cart with discount.length > 0 to 0
                    cart.items[cart.items.length - 1].price = 0;
                } */

                
                    //get _id of the item
                    const id = cartItem._id;
                    //remove the item with the id
                    cart.items = cart.items.filter((item: { _id: { toString: () => string; }; }) => item._id.toString() !== id.toString());
                
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
