const SaveMoreDiscount = require('../../models/SaveMoreDiscount');

module.exports = {
    Query: {
        getSaveMoreDiscounts: async (_: void, args: void) => {
            try {
                const discounts = await SaveMoreDiscount.find();
                return discounts;
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createSaveMoreDiscount: async (_: void, args: {discountInput: any}) => {
            console.log("here")
            try {
                const discount = new SaveMoreDiscount({
                    items: args.discountInput.items,
                    title: args.discountInput.title,
                    buy: args.discountInput.buy,
                    value: args.discountInput.value,
                    activated: args.discountInput.activated
                });

                console.log(discount)

                const result = await discount.save();

                const findResult = await SaveMoreDiscount.findById(result._id).populate('items');

                console.log("this is findresult",findResult)
                return findResult;

            } catch (err) {
                throw err;
            }
        }
    }
};


