import {Schema, model} from 'mongoose';

/* export interface BuyMoreTakeMoreDiscount {
    name: string;
    value: number;
} */

const DiscountSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        //required: true,
    },
    buy: {
        type: Number,
        //required: true,
    },
    take: {
        type: Number,
        //required: true,
    },
    activated: {
        type: Boolean,
        default: false,
        //required: true,
    },
}
);

const BuyMoreTakeMoreDiscount = model('BuyMoreTakeMoreDiscount', DiscountSchema);

module.exports=BuyMoreTakeMoreDiscount;