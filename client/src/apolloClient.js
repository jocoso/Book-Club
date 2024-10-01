// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const httpLink = new HttpLink({
    uri: process.env.VUE_API_URL || "http://localhost:3001/graphql", // Replace with your GraphQL endpoint
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    connectToDevTools: true, // Enable Apollo Client devtools
});

export default apolloClient;
