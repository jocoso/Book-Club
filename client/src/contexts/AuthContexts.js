// AuthContext.js
import { createContext, useState, useEffect } from 'react';

// Utility functions to handle tokens and authentication
export const getToken = () => {
    return localStorage.getItem('id_token');
};

export const isLoggedIn = () => {
    const token = getToken();
    return !!token;
};

export const logout = () => {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
};

export const saveToken = (token) => {
    localStorage.setItem('id_token', token);
};

export const isTokenExpired = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp < Date.now() / 1000;
    } catch (err) {
        return false;
    }
};
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const userData = JSON.parse(atob(token.split('.')[1])); // Decode the user data from token
      setUser(userData);
    }
  }, []);

  const login = (token) => {
    saveToken(token);
    const userData = JSON.parse(atob(token.split('.')[1]));
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: handleLogout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};


// Example of an AuthStatus.js file:
// javascript
// Copy code
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext'; // Import your AuthContext

// const AuthStatus = () => {
//   const { user, login, logout } = useContext(AuthContext); // Access AuthContext

//   return (
//     <div>
//       {user ? (
//         <>
//           <p>Welcome, {user.name}</p>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <button onClick={() => login({ name: 'Jane Doe' })}>Login</button>
//       )}
//     </div>
//   );
// };

// export default AuthStatus;
// Use AuthStatus in your app:
// You can then use this component inside any part of your app to display login/logout functionality.

// For example, in your App.js or in a specific route/page:

// javascript
// Copy code
// import AuthStatus from './components/AuthStatus';

// function SomePage() {
//   return (
//     <div>
//       <h1>My App</h1>
//       <AuthStatus /> {/* This will display login/logout options */}
//     </div>
//   );
// }

// export default SomePage;
// Summary:
// Keep the AuthContext.js as it is. ✔️
// Create separate components (like AuthStatus.js) that use AuthContext for login/logout.
// Similarly, for the book list and discussions, create components to use those contexts.







