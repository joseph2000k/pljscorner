const categoryResolvers = require("./category");
const usersResolvers = require("./users");
const itemResolvers = require("./item");
const paymentmethodResolvers = require("./paymentmethod");
const shopResolvers = require("./shop");
const uploadResolvers = require("./uploadFile");

module.exports = {
  Query: {
    ...categoryResolvers.Query,
    ...itemResolvers.Query,
    ...usersResolvers.Query,
    ...paymentmethodResolvers.Query,
    ...shopResolvers.Query,
    ...uploadResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...itemResolvers.Mutation,
    ...paymentmethodResolvers.Mutation,
    ...shopResolvers.Mutation,
    ...uploadResolvers.Mutation,
  },
};
