import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute'; // Import ProtectedRoute
import UserProfile from './pages/UserProfile';
import App from './App.js'; // Ensure this is the correct path for your App component

const Homepage = React.lazy(() => import('./pages/Homepage.jsx'));
const Error = React.lazy(() => import('./pages/Error.jsx'));
const UserComponent = React.lazy(() => import('./components/User/UserComponent.jsx')); // Fixed lazy loading
const CommunityPage = React.lazy(() => import('./pages/CommunityPage.jsx'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,  // App now handles Apollo setup and rendering
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: 'users',
                element: <ProtectedRoute> {/* Protect this route */}
                    <UserComponent />
                </ProtectedRoute>,
            },
            {
                path: 'users/:userId',
                element: <ProtectedRoute> {/* Protect this route */}
                    <UserProfile />
                </ProtectedRoute>,
            },
            {
                path: 'community',
                element: <CommunityPage />
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider> {/* Wrap everything inside AuthProvider */}
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    </AuthProvider>
);

