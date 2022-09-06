import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
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

const client = new ApolloClient({
  connectToDevTools: true,
  link: from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default client;
