import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    logout(); // Call the logout function to remove token and clear user state
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
};

export default Header;
