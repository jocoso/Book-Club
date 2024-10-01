// src/utils/apolloClient.js

import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
    uri: "/graphql",
});

// Set up middleware for auth
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// Create Apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;
