import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import { expressjwt, Request as JWtRequest } from 'express-jwt';
import {permissions} from './permissions';
const path = require('path');

const { graphqlUploadExpress } = require("graphql-upload-minimal");
const config = require('config');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');
  

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();

  app.use(cors());
  app.use(graphqlUploadExpress());

  const httpServer = http.createServer(app);

  app.use(
    expressjwt({
      secret: config.get('jwtSecret'),
      algorithms: ['HS256'],
      credentialsRequired: false,
    }
  ))

  /* app.use(function (err: any, req: JWtRequest, res: any, next: Function) {
  if (err.name === "UnauthorizedError") {
    throw new Error("Unauthorized");
  } else {
    next(err);
  }
}); */

  const server = new ApolloServer({
    schema: applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), permissions),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }: any) => {
      const user = req.auth || null
      return { user };
    }
  });
  await server.start();
  server.applyMiddleware({ app });

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//connect to Database
const port = process.env.PORT || 5000
connectDB()
  .then(() => {
    return httpServer.listen({ port });
  })
  .then(() => {
    console.log(`Server is running on port http://localhost:${port}${server.graphqlPath}/`);
  });
}

startApolloServer(typeDefs, resolvers);