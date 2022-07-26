const categoryResolvers = require("./category");
const usersResolvers = require("./users");
const itemResolvers = require("./item");
const paymentmethodResolvers = require("./paymentmethod");

module.exports = {
  Query: {
    ...categoryResolvers.Query,
    ...itemResolvers.Query,
    ...usersResolvers.Query,
    ...paymentmethodResolvers.Query
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...itemResolvers.Mutation,
    ...paymentmethodResolvers.Mutation,
  },
};
