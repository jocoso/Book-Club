import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts'; // Ensure the correct path

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn } = useContext(AuthContext); // Assuming isLoggedIn is a boolean value
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If you need token validation or an asynchronous check, you can implement it here
    setLoading(false); // For now, just simulating loading
  }, []);

  // Show a loading spinner or fallback while checking if user is logged in
  if (loading) {
    return <div>Loading...</div>; // Optionally replace with a loading spinner or custom component
  }

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the protected content
  return children;
};

export default ProtectedRoute;


