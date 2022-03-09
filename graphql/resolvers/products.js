const Product = require("../../models/Product");

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
    addProduct: async (_, { productInput }) => {
      const newProduct = new Product({
        name: productInput.name,
        price: productInput.price,
        description: productInput.description,
        sku: productInput.sku,
      });
      const result = await newProduct.save();
      return result;
    },
  },
};
