import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const uri: string = "http://localhost:5000/graphql";

const uploadLink = createUploadLink({
  //uri,
  uri: `https://pljscorner.herokuapp.com/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
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

const client = new ApolloClient({
  connectToDevTools: true,
  link: from([authLink, uploadLink]),
  cache,
});

export default client;
