import { AuthProvider } from './contexts/AuthContexts.js';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/HomePage.jsx";
import Error from "./pages/ErrorPage.jsx";
import UserComponent from "./components/UserComponent/UserComponent.jsx";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import LoginPage from './pages/LoginPage.jsx';  
import SignupPage from './pages/SignupPage.jsx';
 // Import AuthProvider


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
                element: <LoginPage />,  
            },
            {
                path: "/signup", 
                element: <SignupPage /> 
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <UserProfile />  
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
    
    <AuthProvider> {/* Wrap your app with AuthProvider here */}
        <RouterProvider router={router} />
    </AuthProvider>
);
