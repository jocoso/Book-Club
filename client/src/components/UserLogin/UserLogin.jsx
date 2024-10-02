import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '@/store/authStore'; // Adjust path accordingly

const LoginLogoutDisplay = () => {
  const authStore = useContext(AuthContext);

  const logout = () => {
    authStore.logout();
  };

  return (
    <div>
      {authStore.isLoggedIn ? (
        <div>
          Welcome! <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default LoginLogoutDisplay;
