import {Schema, model} from 'mongoose';
import { Item } from './Item';
import { User } from './User';
import { Tax } from './Tax';
import { PaymentMethod } from './PaymentMethod';
import { Shop } from './Shop';
import {SaveMoreDiscount} from './SaveMoreDiscount';

type ReceiptItems = {
    item: Item;
    quantity: number;
    price: number;
    discount: [SaveMoreDiscount];
}

export interface Receipt {
    cashier: User;
    total: number;
    items: [ReceiptItems];
    cash: number;
    change: number;
    receiptnumber: number;
    shop: Shop;
    date: Date;
    time: Date;
    tax: Tax;
    discount: number;
    paymentmethod: PaymentMethod;
    referencenumber: number;
}

const ReceiptSchema = new Schema<Receipt>({
    cashier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        //required: true,
    },
    total: {
        type: Number,
        //required: true,
    },
    items: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
            //required: true,
        },
        item: {
            type: String,
            ref: 'Item',
            //required: true,
        },
        quantity: {
            type: Number,
            //required: true,
        },
        price: {
            type: Number,
            //required: true,
        },
        discount: [{
            type: Schema.Types.ObjectId,
            ref: 'SaveMoreDiscount',
            //required: true,
        }],
    }],
    cash: {
        type: Number,
        //required: true,
    },
    change: {
        type: Number,
        //required: true,
    },
    receiptnumber: {
        type: Number,
        //required: true,
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        //required: true,
    },
    date: {
        type: Date,
        //required: true,
    },
    time: {
        type: Date,
        //required: true,
    },  
    tax: {
        type: Schema.Types.ObjectId,
        ref: 'Tax',
    },
    discount: {
        type: Number,
    },
    paymentmethod: {
        type: Schema.Types.String,
        ref: 'PaymentMethod',
        //required: true,
    },
    referencenumber: {
        type: Number
    }
}
);

const Receipt = model('Receipt', ReceiptSchema);

module.exports = Receipt;

    