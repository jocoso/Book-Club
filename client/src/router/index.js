// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue"; // Import your HomePage component
import UserComponent from "@/components/UserComponent.vue"; // Direct import of UserComponent
import UserLogin from '@/components/UserLogin.vue'; // Import UserLogin component
import UserSignup from '@/components/UserSignup.vue'; // Import UserSignup component
import UserSettings from '@/components/UserSettings.vue'; // Import UserSettings component
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
        path: "/login",
        name: "UserLogin",
        component: UserLogin, // Route for login
      },
      {
        path: "/signup",
        name: "UserSignup",
        component: UserSignup, // Route for signup
      },
      {
        path: "/user-settings",
        name: "UserSettings",
        component: UserSettings, // Route for user settings
      },
      {
        path: "/user-profile",
        name: "UserProfile",
        component: UserProfile, // Route for user profile
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
