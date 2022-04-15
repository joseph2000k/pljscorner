import {ApolloServer} from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';

import { connectDB } from './config/db';
import http from 'http';
import {typeDefs} from './graphql/typeDefs';

import {resolvers, IResolvers} from './graphql/resolvers';
import { DocumentNode } from 'graphql';




async function startApolloServer(typeDefs: DocumentNode, resolvers: IResolvers) {
  const app = express();
  const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});

await server.start();
server.applyMiddleware({app});
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