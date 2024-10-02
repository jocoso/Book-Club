import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries/queries';

const Navigation = () => {
  const { data: user, refetch } = useQuery(GET_ME, { fetchPolicy: 'network-only' });

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    refetch();
    window.location.href = '/login';
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book-clubs">Book Clubs</Link></li>
        <li><Link to="/discussions/clubId">Discussions</Link></li>
        <li><Link to="/reviews/bookId">Reviews</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <Link to="/user-settings">Settings</Link>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

