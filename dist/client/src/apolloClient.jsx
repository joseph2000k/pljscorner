"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const context_1 = require("@apollo/client/link/context");
const apollo_upload_client_1 = require("apollo-upload-client");
const uri = "http://localhost:5000/graphql";
const uploadLink = (0, apollo_upload_client_1.createUploadLink)({
    //uri,
    uri: `https://pljscorner.herokuapp.com/graphql`,
});
const authLink = (0, context_1.setContext)((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token}` : "" }),
    };
});
const cache = new client_1.InMemoryCache({
    typePolicies: {
        Cart: {
            fields: {
                items: {
                    merge(existing = [], incoming) {
                        return [...incoming];
                    },
                },
            },
        },
    },
});
const client = new client_1.ApolloClient({
    connectToDevTools: true,
    link: (0, client_1.from)([authLink, uploadLink]),
    cache,
});
exports.default = client;
