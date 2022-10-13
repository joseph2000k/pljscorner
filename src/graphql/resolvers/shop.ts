const Shop = require('../../models/Shop');
import {Shop as ShopType} from '../../models/Shop';

module.exports = {
    Query: {
        shops: async () => {
            try {
                const shops = await Shop.find();
                return shops;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        async addShop (_: void, args: {shopInput: ShopType}) {
            const newShop = new Shop({
                name: args.shopInput.name,
                address: args.shopInput.address,
            });
            const shop = await newShop.save();
            return shop
        }
    }
}





