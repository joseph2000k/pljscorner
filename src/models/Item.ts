import {Schema, model} from 'mongoose';
import {Category} from './Category';

export interface Item {
  category: Category;
  name: string;
  price: number;
  cost: number;
  sku: string;
  barcode: string;
  stock: number;
  image: string;
}


const ItemSchema = new Schema<Item>({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  sku: {
    type: String,
  },
  barcode: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  }
});

const Item = model('Item', ItemSchema);

module.exports = Item;
