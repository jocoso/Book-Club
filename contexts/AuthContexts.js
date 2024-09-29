// AuthContext.js
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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







