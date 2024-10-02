import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../contexts/AuthContexts'; // Ensure this path is correct
import { ADD_FRIEND } from '../../utils/mutations/mutations';

const AddFriendButton = ({ friendId, friendUsername, friendEmail }) => {
  // Get the current user from AuthContext
  const { user } = useContext(AuthContext);

  // Mutation to add a friend
  const [addFriend] = useMutation(ADD_FRIEND);

  // Handler function to add a friend
  const handleAddFriend = async () => {
    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    try {
      const response = await addFriend({
        variables: {
          userId: user._id,  // Logged-in user ID from context
          friendId,          // The friend's ID passed as a prop
          friendUsername,    // The friend's username passed as a prop
          friendEmail        // The friend's email passed as a prop
        },
      });

      console.log('Friend added:', response.data.addFriend);
    } catch (err) {
      console.error('Error adding friend:', err);
    }
  };

  // Only show the Add Friend button if the user is logged in
  return user ? (
    <button onClick={handleAddFriend}>Add Friend</button>
  ) : null;  // If user is not logged in, return nothing
};

export default AddFriendButton;