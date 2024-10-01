import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import router from "./router";

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
    uri: "http://localhost:3001/graphql",
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
