import React from "react";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  console.log("TOKENNNNNN", token);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ``,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const CustomApolloProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default CustomApolloProvider;
