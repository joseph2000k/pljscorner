import {Schema, model} from 'mongoose';

export interface Discount {
    name: string;
    value: number;
}

const DiscountSchema = new Schema<Discount>({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
}
);

const Discount = model('Discount', DiscountSchema);

module.exports=Discount;