import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/HomePage.jsx";
import Error from "./pages/ErrorPage";
import UserComponent from "./components/UserComponent/UserComponent.jsx";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ClubPage from "./pages/ClubPage.jsx";
import BookPage from "./pages/BookPage.jsx";

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
                path: "/communities",
                element: <CommunityPage />,
            },
            {
                path: "/communities/:_id",
                element: <ClubPage />,
            },
            {
                path: "/books/:isbn",
                element: <BookPage />,
            },
            {
                path: "/users",
                element: <UserComponent />,
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute>
                        {/* Protect this route */}
                        <UserComponent />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users/:userId",
                element: (
                    <ProtectedRoute>
                        {/* Protect this route */}
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
