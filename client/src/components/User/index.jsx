import React from 'react';
import UserComponent from './UserComponent';

// Wrapper component that renders the UserComponent
const User = () => {
  return (
    <div>
      <h2>User List</h2>
      <UserComponent />
    </div>
  );
};

export default User;
