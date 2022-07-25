import {Schema, model} from 'mongoose';
import { Item } from './Item';
import { User } from './User';
import { Discount } from './Discount';
import { Tax } from './Tax';
import { PaymentMethod } from './PaymentMethod';

export interface Receipt {
    cashier: User;
    total: number;
    items: Item[];
    cash: number;
    change: number;
    receiptnumber: number;
    date: Date;
    time: Date;
    tax: Tax;
    discount: Discount;
    paymentmethod: PaymentMethod;
    referencenumber: number;
}

const ReceiptSchema = new Schema<Receipt>({
    cashier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    }],
    cash: {
        type: Number,
        required: true,
    },
    change: {
        type: Number,
        required: true,
    },
    receiptnumber: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },  
    tax: {
        type: Schema.Types.ObjectId,
        ref: 'Tax',
        required: true,
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'Discount',
        required: true,
    },
    paymentmethod: {
        type: Schema.Types.String,
        ref: 'PaymentMethod',
        required: true,
    },
    referencenumber: {
        type: Number
    }
}
);

const Receipt = model('Receipt', ReceiptSchema);

module.exports = Receipt;

    