const buyMoreAndSaveDiscount = require('../../models/BuyMoreAndSaveDiscount');

module.exports = {
    Query: {
        getBMSDiscounts: async (_: void, args: void) => {
            try {
                const discounts = await 
                buyMoreAndSaveDiscount.find();
                return discounts;
            } catch (err) {
                throw err;
            }
        },
        getBMSDiscount: async (_: void, args: {discountId: string}) => {
            try {
                const discount = await 
                buyMoreAndSaveDiscount.findById(args.discountId);
                return discount;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        addBMSDiscount: async (_: void, args: {discountInput: any}) => {
            try {
                const discount = new 
                buyMoreAndSaveDiscount({
                    item: args.discountInput.item,
                    buy: args.discountInput.buy,
                    saveValue: args.discountInput.saveValue,
                    activated: args.discountInput.activated
                });

                const result = await discount.save();

                const findResult = await 
                buyMoreAndSaveDiscount.findById(result._id).populate('item');
                return findResult;

            } catch (err) {
                throw err;
            }
        }
    }
};


