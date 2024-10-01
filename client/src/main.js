import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import router from "./router";

// Use Vite's environment variable for API URL
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
    uri: `${import.meta.env.VITE_API_URL}/graphql` || "http://localhost:3001/graphql", // Use environment variable here
    cache,
});

createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
})
    .use(router)
    .mount("#app");
