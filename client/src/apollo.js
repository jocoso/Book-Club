// src/apollo.js (Setting up Apollo Client for Vue)
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

// Create an Apollo client
const apolloClient = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
});

// Create an Apollo provider
export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});
