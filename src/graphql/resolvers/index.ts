const categoryResolvers = require("./category");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...categoryResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...categoryResolvers.Mutation,
  },
};
