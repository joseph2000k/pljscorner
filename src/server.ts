import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { expressjwt, Request as JWtRequest } from 'express-jwt';

const config = require('config');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');
  

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(
    expressjwt({
      secret: config.get('jwtSecret'),
      algorithms: ['HS256'],
      credentialsRequired: false,
    }
  ))

  app.use(function (err: any, req: JWtRequest, res: any, next: Function) {
  if (err.name === "UnauthorizedError") {
    throw new Error("Unauthorized");
  } else {
    next(err);
  }
});

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }: any) => {
      const user = req.auth || null;
      return { user };
    }
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