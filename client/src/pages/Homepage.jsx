import React from 'react';
import { Link } from 'react-router-dom';

import { LimitedBookList } from '../components/BookList';


const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Book Club Hub</h1>
      <p>Your ultimate platform for book clubs!</p>
      <Link to="/users">View All Users</Link> {/* Link to the user list */}
    
      <h1>Latest Books</h1>
      <LimitedBookList />
    </div>
  );
};

export default Homepage;
