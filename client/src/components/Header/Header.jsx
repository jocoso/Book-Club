import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
};

export default Header;