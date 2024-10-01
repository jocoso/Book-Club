// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue"; // Import your HomePage component
import UserComponent from "@/components/UserComponent.vue"; // Direct import of UserComponent
import UserProfile from "@/pages/UserProfile.vue"; // Direct import of UserProfile
import CommunityPage from "@/pages/CommunityPage.vue"; // Direct import of CommunityPage
import ErrorPage from "@/pages/ErrorPage.vue"; // Direct import of ErrorPage

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/users",
        name: "UserComponent",
        component: UserComponent,
    },
    {
        path: "/users/:userId",
        name: "UserProfile",
        component: UserProfile,
    },
    {
        path: "/community",
        name: "CommunityPage",
        component: CommunityPage,
    },
    {
        path: "/:catchAll(.*)",
        name: "ErrorPage",
        component: ErrorPage, // Error page
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
