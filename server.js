const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//connect to Database
connectDB()
  .then(() => {
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running on port ${res.url}`);
  });
