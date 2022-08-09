const Category = require("../../models/Category");
import {Category as CategoryType} from "../../models/Category";


module.exports = {
  Query: {
    getCategory: async () => {
      try {
        const category = await Category.find();
        return category;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async addCategory (_: void, args: {categoryInput: CategoryType})  {
      const newCategory = new Category({
        name: args.categoryInput.name,
      });
      const result = await newCategory.save();
      return result;
    },
  },
};
