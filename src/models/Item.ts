import {Schema, model} from 'mongoose';
import {Product} from './Product';

export interface Item {
  productId: Product;
  quantity: number;
  supplier: string;
  batchprice: Number;
  batchdate: Date;
}


const ItemSchema = new Schema<Item>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
  supplier: {
    type: String,
  },
  batchprice: {
    type: Number,
  },
  batchdate: {
    type: Date,
  },
});

const Item = model('Item', ItemSchema);

module.exports = Item;
