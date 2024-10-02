import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '@/utils/queries/userQueries';
import { ADD_FRIEND } from '@/utils/mutations/userMutations';

const UserList = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [addFriend] = useMutation(ADD_FRIEND);
  const loggedInUserId = localStorage.getItem('user_id');

  useEffect(() => {
    console.log('Logged-in User ID:', loggedInUserId);
  }, [loggedInUserId]);

  const handleAddFriend = async (user_Id, friend_Id) => {
    if (!user_Id) {
      console.error('Cannot add friend: user_Id is null or undefined.');
      return;
    }

    try {
      const response = await addFriend({ variables: { user_Id, friend_Id } });
      console.log('Friend added:', response.data.addFriend);
    } catch (err) {
      console.error('Error adding friend:', err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user._id}>
          {user.username} - {user.email}
          <button onClick={() => handleAddFriend(loggedInUserId, user._id)}>
            Add Friend
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
