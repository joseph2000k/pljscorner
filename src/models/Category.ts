import {Schema, model} from 'mongoose';

export interface Category {
    name: string;

}

const CategorySchema = new Schema<Category>({
  name: {
    type: String,
  }
});

const Category = model('Category', CategorySchema);

module.exports=Category;