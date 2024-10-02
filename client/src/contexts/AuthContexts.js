import { createContext, useState, useEffect } from 'react';

// Helper functions for token management
export const getToken = () => localStorage.getItem('id_token');
export const getUserId = () => localStorage.getItem('user_id'); // Helper to retrieve user ID
export const saveToken = (token) => {
  localStorage.setItem('id_token', token);
  const userId = JSON.parse(atob(token.split('.')[1]))._id; // Extract user ID from token
  localStorage.setItem('user_id', userId); // Save user ID in localStorage
};
export const removeToken = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('user_id'); // Remove user ID when logging out
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    return decoded.exp < Date.now() / 1000; // Compare exp (expiry) with the current time
  } catch (err) {
    return true; // If decoding fails, assume token is expired
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for user data
  const [loggedInUserId, setLoggedInUserId] = useState(null); // State for user ID

  // Check if the user is logged in and the token is valid when the component mounts
  useEffect(() => {
    const token = getToken();
    const userId = getUserId(); // Fetch user ID from localStorage

    if (token && !isTokenExpired(token)) {
      const userData = JSON.parse(atob(token.split('.')[1])); // Decode user data from the token
      setUser(userData); // Set the user if the token is valid
      setLoggedInUserId(userId); // Set the logged-in user ID
    } else {
      removeToken(); // If the token is expired or invalid, clear it
      setUser(null); // Ensure no user is set
      setLoggedInUserId(null); // Clear the logged-in user ID
    }
  }, []);

  // Function to log in, save the token, and update the user state
  const login = (token) => {
    saveToken(token); // Save both token and user ID in localStorage
    const userData = JSON.parse(atob(token.split('.')[1])); // Decode user data from token
    setUser(userData); // Set the logged-in user
    setLoggedInUserId(userData._id); // Set the logged-in user ID
  };

  // Function to log out, clear the token, and reset the user state
  const logout = () => {
    removeToken(); // Remove the token and user ID from localStorage
    setUser(null); // Clear the user state
    setLoggedInUserId(null); // Clear the logged-in user ID state
  };

  return (
    <AuthContext.Provider value={{ user, loggedInUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};









