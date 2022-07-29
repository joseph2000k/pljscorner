import {Schema, model} from 'mongoose';

export interface Shop {
    name: string;
    address: string;
}

const ShopSchema = new Schema<Shop>({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    }
});

const Shop = model('Shop', ShopSchema);

module.exports = Shop;