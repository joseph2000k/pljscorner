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

                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.cartInput);
                const discount = await BMSDiscount.findOne({item: args.cartInput, activated: true});
                const discount2 = await SMDiscount.findOne({items: args.cartInput, activated: true});

          
                //get total quantity of cart items that has discount property of discount2._id
                let totalQuantityWithDiscount = 0;
                cart.items.forEach((item: { discount: any; quantity: number; }) => {
                    if(item.discount.length > 0) {
                        totalQuantityWithDiscount += item.quantity;
                    }
                });


                


                if(!cartItem) {
                    cart.items.push({
                        itemId: item._id,
                        item: item.name,
                        quantity: 1,
                        price: item.price,
                    });
                }else if(totalQuantityWithDiscount > 0) {
                    //log if mulitiple of discount.buy
                    if(totalQuantityWithDiscount % discount2.buy === 0) {
                        cart.items.push({
                        itemId: item._id,
                        item: item.name,
                        quantity: 1,
                        price: item.price,
                    });
                    }

                }else {
                    cartItem.quantity += 1;
                    cartItem.price += item.price;
                }


                let items=[];
                if(discount2) {
                    const itemsInDiscount2 = cart.items.filter((item: { itemId: { toString: () => string; }; }) => discount2.items.includes(item.itemId.toString()));
                    items.push(...itemsInDiscount2);
                }
                
                let totalQuantity = 0;
                items.forEach((item: { quantity: number; }) => {
                    totalQuantity += item.quantity;
                });

                if(discount2){
                    let remainder = totalQuantity % discount2.buy;

                    if(remainder===0) {
                        cart.items.forEach((item: { itemId: { toString: () => string; }; discount: any; price: number }) => {
                            if(discount2.items.includes(item.itemId.toString())) {
                                /* item.price = item.price - discount2.saveValue; */
                                item.discount.push(discount2._id);
                            }
                        });
                        //find all items in cart that has discount2._id in discount property
                        let toJoinItems: { itemId: { toString: () => string; }; discount: any; price: number; }[]=[];
                        cart.items.forEach((item: { itemId: { toString: () => string; }; discount: any; price: number }) => {
                            if(item.discount.includes(discount2._id)) {
                                //store all found items in an array then push to cart.items
                                toJoinItems.push(item);
                            }
                        });

                        //find all itmes in toJoinItems that has quantity greater than 1 then separate them into individual items then push to cart.items\
                        toJoinItems.forEach((item:any) => {
                            if(item.quantity > 1) {
                                for(let i = 0; i < item.quantity; i++) {
                                    cart.items.push({
                                        itemId: item.itemId,
                                        item: item.item + discount2.title,
                                        quantity: 1,
                                        price: 0,
                                        discount: item.discount
                                    });
                                    //if first index then change price to discount.saveValue
                                }
                            }
                            //change price to 0
                            item.price = 0;
                        });
                        //remove items in cartitems that has a discount property that has discount2._id with quantity greater than 1
                        cart.items = cart.items.filter((item: {
                            quantity: number; itemId: { toString: () => string; }; discount: any; price: number 
}) => {
                            if(item.discount.includes(discount2._id) && item.quantity > 1) {
                                return false;
                            }
                            return true;
                        });

                        toJoinItems=[]

                        //sort cart items that has discount2._id in discount property
                cart.items = cart.items.sort((a: { discount: any; }, b: { discount: any; }) => {
                    if(a.discount.includes(discount2._id) && !b.discount.includes(discount2._id)) {
                        return -1;
                    } else if(!a.discount.includes(discount2._id) && b.discount.includes(discount2._id)) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                    } 

                    //select last index of cart.items that has discount2._id in discount property
                    let lastIndex = cart.items.length - 1;
                    for(let i = lastIndex; i >= 0; i--) {
                        if(cart.items[i].discount.includes(discount2._id)) {
                            lastIndex = i;
                            cart.items[i].price = discount2.saveValue;
                            break;
                        }
                    }

                    //reverse cart.items
                    cart.items = cart.items.reverse();
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
                const discount = await BMSDiscount.findOne({item: args.cartInput, activated: true});
                const discount2 = await SMDiscount.findOne({items: args.cartInput, activated: true});
                
                if(!cart) {
                    return new Error('Cart not found');
                }
                if(!item) {
                    return new Error('Item not found');
                }

                const cartItem = cart.items.find((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() === args.cartInput);
             
               
                if(!cartItem) {
                    return new Error('Item not found in cart');
                } /* else if(cartItem && discount) {
                    const remainder = cartItem.quantity % discount.buy;
                    if(remainder === 0) {
                        cartItem.price -= item.price - discount.saveValue;
                    } else {
                    cartItem.price -= item.price;
                    }
                    cartItem.quantity -= 1;
                } */
                else {
                    cartItem.quantity -= 1;
                    cartItem.price -= item.price;
                }

                if(cartItem.quantity < 1) {
                    cart.items = cart.items.filter((item: { itemId: { toString: () => string; }; }) => item.itemId.toString() !== args.cartInput);
                }

                let totalQuantityOfItemsInDiscount = 0;
                if(discount2) {
                    const itemsInDiscount = cart.items.filter((item: { itemId: { toString: () => string; }; }) => discount2.items.includes(item.itemId.toString()));
                    itemsInDiscount.forEach((item: { quantity: number; }) => {
                        totalQuantityOfItemsInDiscount += item.quantity;
                    });
                }

                let remainder = totalQuantityOfItemsInDiscount % discount2.buy;
                if(remainder === 0) {
                    console.log('remainder is 0');
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
