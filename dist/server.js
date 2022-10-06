"use strict";
const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
//connect to Database
const PORT = process.env.PORT;
connectDB()
  .then(() => {
    return server.listen({ PORT });
  })
  .then(() => {
    console.log(`Server is running on port http://localhost:${port}/`);
  });
