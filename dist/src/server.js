"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const graphql_middleware_1 = require("graphql-middleware");
const cors_1 = __importDefault(require("cors"));
const apollo_server_core_1 = require("apollo-server-core");
const schema_1 = require("@graphql-tools/schema");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const express_jwt_1 = require("express-jwt");
const permissions_1 = require("./permissions");
const path = require('path');
const { graphqlUploadExpress } = require("graphql-upload-minimal");
const config = require('config');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(graphqlUploadExpress());
        const httpServer = http_1.default.createServer(app);
        app.use((0, express_jwt_1.expressjwt)({
            secret: config.get('jwtSecret'),
            algorithms: ['HS256'],
            credentialsRequired: false,
        }));
        /* app.use(function (err: any, req: JWtRequest, res: any, next: Function) {
        if (err.name === "UnauthorizedError") {
          throw new Error("Unauthorized");
        } else {
          next(err);
        }
      }); */
        const server = new apollo_server_express_1.ApolloServer({
            schema: (0, graphql_middleware_1.applyMiddleware)((0, schema_1.makeExecutableSchema)({ typeDefs, resolvers }), permissions_1.permissions),
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
            context: ({ req }) => {
                const user = req.auth || null;
                return { user };
            }
        });
        yield server.start();
        server.applyMiddleware({ app });
        //serve static assets in production
        if (process.env.NODE_ENV === 'production') {
            //set static folder
            app.use(express_1.default.static('client/build'));
            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
            });
        }
        //connect to Database
        const port = process.env.PORT || 5000;
        connectDB()
            .then(() => {
            return httpServer.listen({ port });
        })
            .then(() => {
            console.log(`Server is running on port http://localhost:${port}${server.graphqlPath}/`);
        });
    });
}
startApolloServer(typeDefs, resolvers);
