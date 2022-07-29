import {Schema, model} from 'mongoose';
import {User} from './User';
import { Item } from './Item';

export interface Cart {
    user: User;
    items: Item[];
}

const CartSchema = new Schema<Cart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }],
});

const Cart = model('Cart', CartSchema);

module.exports=Cart;