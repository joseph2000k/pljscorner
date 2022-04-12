import {Schema, model} from 'mongoose';
import {User} from './User';

export interface Product {
    name: string;
    description: string;
    sku: string;
    price: number;
    image: string;
    user: User;

}

const ProductSchema = new Schema<Product>({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  sku: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Product = model('Product', ProductSchema);

module.exports=Product;