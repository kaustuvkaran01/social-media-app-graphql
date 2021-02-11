import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from '@apollo/react-hooks';



const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:"http://localhost:5000"
});
export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
