const Product = require("../../models/Product");
import {Product as ProductType} from "../../models/Product";


module.exports = {
  Query: {
    getProducts: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async addProduct (_: void, args: {productInput: ProductType})  {
      const newProduct = new Product({
        name: args.productInput.name,
        price: args.productInput.price,
        description: args.productInput.description,
        sku: args.productInput.sku,
      });
      const result = await newProduct.save();
      return result;
    },
  },
};
