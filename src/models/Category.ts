import {Schema, model} from 'mongoose';

export interface Category {
    categoryName: string;

}

const CategorySchema = new Schema<Category>({
  categoryName: {
    type: String,
  }
});

const Category = model('Category', CategorySchema);

module.exports=Category;