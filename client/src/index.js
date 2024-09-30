import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from 'react';
import UserProfile from './pages/UserProfile';
import App from './App.js'; // Ensure this is the correct path for your App component

const Homepage = React.lazy(() => import('./pages/Homepage.jsx'));
const Error = React.lazy(() => import('./pages/Error.jsx'));
const UserComponent = React.lazy(() => import('./components/User/UserComponent.jsx')); // Fixed lazy loading

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
                element: <UserComponent />,  // Lazy-loaded user component
            },
            {
                path: 'users/:userId', 
                element: <UserProfile />
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
    </Suspense>
);

