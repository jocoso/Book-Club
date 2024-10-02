import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/HomePage.jsx";
import Error from "./pages/ErrorPage";
import UserComponent from "./components/UserComponent/UserComponent.jsx";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import LoginPage from './pages/LoginPage.jsx';  // Import the new LoginPage component
import ProfilePage from './pages/ProfilePage.jsx';  // Import the new ProfilePage component

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/login",
                element: <LoginPage />,  // Add the login route
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />  // Add the profile route inside ProtectedRoute
                    </ProtectedRoute>
                ),
            },
            {
                path: "/users",
                element: <UserComponent />,
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute>
                        <UserComponent />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users/:userId",
                element: (
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
