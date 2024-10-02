import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '@/utils/mutations/userMutations';

const AddFriendButton = ({ friendId }) => {
  const [addFriend] = useMutation(ADD_FRIEND);

  const handleAddFriend = async () => {
    try {
      await addFriend({ variables: { userId: 'loggedInUserId', friendId } });
      console.log('Friend added');
    } catch (err) {
      console.error('Error adding friend', err);
    }
  };

  return <button onClick={handleAddFriend}>Add Friend</button>;
};

export default AddFriendButton;
