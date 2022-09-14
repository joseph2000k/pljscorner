const categoryResolvers = require("./category");
const usersResolvers = require("./users");
const itemResolvers = require("./item");
const paymentmethodResolvers = require("./paymentmethod");
const shopResolvers = require("./shop");
const uploadResolvers = require("./uploadFile");
const receiptResolvers = require("./receipt");
const cartResolvers = require("./cart");
const buymoretakemorediscountResolvers = require("./buymoretakemorediscount");

module.exports = {
  Query: {
    ...categoryResolvers.Query,
    ...itemResolvers.Query,
    ...usersResolvers.Query,
    ...paymentmethodResolvers.Query,
    ...shopResolvers.Query,
    ...uploadResolvers.Query,
    ...receiptResolvers.Query,
    ...cartResolvers.Query,
    ...buymoretakemorediscountResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...itemResolvers.Mutation,
    ...paymentmethodResolvers.Mutation,
    ...shopResolvers.Mutation,
    ...uploadResolvers.Mutation,
    ...receiptResolvers.Mutation,
    ...cartResolvers.Mutation,
    ...buymoretakemorediscountResolvers.Mutation,
  },
};
