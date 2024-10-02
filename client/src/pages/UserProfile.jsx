import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/utils/queries/userQueries';

const UserProfile = () => {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.me.username}'s Profile</h1>
      <p>Email: {data.me.email}</p>
      <h3>Friends:</h3>
      <ul>
        {data.me.friends.map(friend => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;

