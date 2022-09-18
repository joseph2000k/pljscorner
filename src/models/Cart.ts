import {Schema, model} from 'mongoose';
import {User} from './User';
import { Item } from './Item';
import {SaveMoreDiscount} from './SaveMoreDiscount';


type CartItems = {
    item: Item;
    quantity: number;
    price: number;
    discount: [SaveMoreDiscount];
}
export interface Cart {
    user: User;
    items: [CartItems];
}

const CartSchema = new Schema<Cart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
});

const Cart = model('Cart', CartSchema);

module.exports=Cart;