import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Book Club Hub</h1>
      <p>Your ultimate platform for book clubs!</p>
      <Link to="/users">View All Users</Link> {/* Link to the user list */}
    </div>
  );
};

export default Homepage;
