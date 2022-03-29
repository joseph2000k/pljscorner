const Product = require("../../models/Product");

interface productInput {
  name: string;
  price: number;
  description: string;
  sku: string;
}
  

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
    addProduct: async (_: void, args: productInput) => {
      const newProduct = new Product({
        name: args.name,
        price: args.price,
        description: args.description,
        sku: args.sku,
      });
      const result = await newProduct.save();
      return result;
    },
  },
};
