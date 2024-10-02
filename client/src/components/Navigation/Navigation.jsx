import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContexts'; // Adjust the path to your context

const Navigation = () => {
  const { user } = useContext(AuthContext); // Access the logged-in user from context

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book-clubs">Book Clubs</Link></li>
        <li><Link to="/discussions">Discussions</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>

        {/* Show Profile tab for logged-in users */}
        {user && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;



