import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });

//connect to Database
const port = 5000
connectDB()
  .then(() => {
    return httpServer.listen({ port });
  })
  .then(() => {
    console.log(`Server is running on port http://localhost:${port}${server.graphqlPath}/`);
  });
}

startApolloServer(typeDefs, resolvers);