import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from 'react';

import App from './App.js'

const Homepage = React.lazy(() => import('./pages/Homepage.jsx'));
const Error = React.lazy(() => import('./pages/Error.jsx'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
    </Suspense>
);
