import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Assuming you might add some async check for the token
  }, []);

  // Show a loading spinner or fallback while checking if user is logged in
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader
  }

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;

