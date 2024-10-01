// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import UserComponent from "@/components/UserComponent.vue";
import UserProfile from "@/pages/UserProfile.vue";
import CommunityPage from "@/pages/CommunityPage.vue";
import ErrorPage from "@/pages/ErrorPage.vue";

// Import your new pages
import SuggestionPage from "@/pages/SuggestionPage.vue";
import CreateClubPage from "@/pages/CreateClubPage.vue";
import ClubPage from "@/pages/ClubPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import LoginPage from "@/pages/LoginPage.vue";

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
        path: "/suggestions",
        name: "SuggestionPage",
        component: SuggestionPage,
    },
    {
        path: "/create-club",
        name: "CreateClubPage",
        component: CreateClubPage,
    },
    {
        path: "/club/:clubId",
        name: "ClubPage",
        component: ClubPage,
    },
    {
        path: "/signup",
        name: "SignupPage",
        component: SignupPage,
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
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
