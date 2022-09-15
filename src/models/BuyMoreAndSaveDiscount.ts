import {Schema, model} from 'mongoose';

/* export interface BuyMoreAndSaveDiscount {
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
    saveValue: {
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

const BuyMoreAndSaveDiscount = model('BuyMoreAndSaveDiscount', DiscountSchema);

module.exports=BuyMoreAndSaveDiscount;