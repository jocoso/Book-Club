import React, { userContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Navigation = () => {
    // Destructure user and setUser from UserContext
    const { user, setUser } = useContext(UserContext);
    
    // Function to handle logout
    const handleLogout = () => {
        setUser(null); // Set user to null, effectively logging out
        //Additional logout handling logic, such as clearing tokens or redirecting
    };

    return (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/book-clubs">Book Clubs</Link></li>
            <li><Link to="/discussions/clubId">Discussions</Link></li>
            <li><Link to="/reviews/bookId">Reviews</Link></li>
            <li><Link to="/user-profile">Profile</Link></li>
            {user ? (
              <>
                <li><Link to="/user-settings">Settings</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (  // If no user, show login and signup options
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