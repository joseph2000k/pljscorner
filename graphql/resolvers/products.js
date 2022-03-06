const Product = require('../../models/Product');

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
};
