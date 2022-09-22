const SaveMoreDiscount = require('../../models/SaveMoreDiscount');

module.exports = {
    Query: {
        getSMDiscounts: async (_: void, args: void) => {
            try {
                const discounts = await SaveMoreDiscount.find().populate('items');
                return discounts;
            } catch (err) {
                throw err;
            }
        },
        viewDiscountedItems: async (_: void, args: {discountId: string}) => {
            try {
                const discount = await SaveMoreDiscount.findById(args.discountId);
                return discount;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        createSMDiscount: async (_: void, args: {discountInput: any}) => {
            console.log("here")
            try {
                const discount = new SaveMoreDiscount({
                    items: args.discountInput.items,
                    title: args.discountInput.title,
                    buy: args.discountInput.buy,
                    saveValue: args.discountInput.saveValue,
                    activated: args.discountInput.activated
                });

                const result = await discount.save();

                const findResult = await SaveMoreDiscount.findById(result._id).populate('items');
                return findResult;

            } catch (err) {
                throw err;
            }
        },

        addSMDItem: async (_: void, args: {discountId: string, item: string}) => {
            try {
                const discount = await SaveMoreDiscount.findById(args.discountId).populate('items');
                
                const item = discount.items.find((item: any) => item._id == args.item);
                if (item) {
                    return new Error('Item already exists');
                }

                await discount.items.push(args.item);
                await discount.save();
                console.log(discount);
                return discount;
            } catch (err) {
                throw err;
            }
        },
    }
};