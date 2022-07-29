const Item = require('../../models/Item');
import {Item as ItemType} from '../../models/Item';

module.exports = {
    Query: {
        getItem: async () => {
            try {
                const item = await Item.find().populate('category');
                return item;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        async addItem (_: void, args: {itemInput: ItemType})  {
            const newItem = new Item({
                category: args.itemInput.category,
                name: args.itemInput.name,
                price: args.itemInput.price,
                cost: args.itemInput.cost,
                sku: args.itemInput.sku,
                barcode: args.itemInput.barcode,
                stock: args.itemInput.stock,
                image: args.itemInput.image,
            });
            const item = await newItem.save();
            const result = await Item.findById(item._id).populate('category');
            return result;
        }
    }
}

