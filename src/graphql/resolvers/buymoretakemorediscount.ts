const BuyMoreTakeMoreDiscount = require('../../models/BuyMoreTakeMoreDiscount');

module.exports = {
    Query: {
        getBMTMDiscounts: async (_: void, args: void) => {
            try {
                const discounts = await BuyMoreTakeMoreDiscount.find();
                return discounts;
            } catch (err) {
                throw err;
            }
        },
        getBMTMDiscount: async (_: void, args: {discountId: string}) => {
            try {
                const discount = await BuyMoreTakeMoreDiscount.findById(args.discountId);
                return discount;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        addBMTMDiscount: async (_: void, args: {discountInput: any}) => {
            try {
                const discount = new BuyMoreTakeMoreDiscount({
                    item: args.discountInput.item,
                    buy: args.discountInput.buy,
                    take: args.discountInput.take,
                    activated: args.discountInput.activated
                });

                const result = await discount.save();

                const findResult = await BuyMoreTakeMoreDiscount.findById(result._id).populate('item');
                return findResult;

            } catch (err) {
                throw err;
            }
        }
    }
};


