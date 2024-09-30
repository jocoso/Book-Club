// src/components/User/UserComponent.jsx
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '../../utils/queries/userQueries';
import { ADD_FRIEND } from '../../utils/mutations/userMutations';

const UserComponent = () => {
  // Fetch all users using the GET_ALL_USERS query
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [addFriend] = useMutation(ADD_FRIEND); // Mutation for adding a friend

  if (loading) return <p>Loading...</p>; // Display while loading data
  if (error) return <p>Error: {error.message}</p>; // Display on error

  // Handler function to add a friend
  const handleAddFriend = (userId, friendId) => {
    addFriend({ variables: { userId, friendId } })
      .then((response) => {
        console.log('Friend added:', response.data.addFriend);
      })
      .catch((err) => {
        console.error('Error adding friend:', err);
      });
  };

  return (
    <div>
      <ul>
        {/* Map through the users and display each one */}
        {data.users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email}
            {/* Add friend button, replace 'loggedInUserId' with actual ID */}
            <button onClick={() => handleAddFriend('loggedInUserId', user._id)}>
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;
