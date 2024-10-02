
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries/userQueries';  // Adjust the relative path

const UserProfile = () => {
  const { data, loading, error } = useQuery(GET_ME); // Fetch user data using the GET_ME query

  // Show a loading indicator while fetching data
  if (loading) return <div>Loading...</div>;

  // Handle errors during the query
  if (error) return <div>Error: {error.message}</div>;

  // Check if user data exists
  if (!data || !data.me) {
    return <div>No user data available. Please log in.</div>;
  }

  return (
    <div>
      <h1>{data.me.username}'s Profile</h1>
      <p>Email: {data.me.email}</p>
      <h3>Friends:</h3>
      <ul>
        {data.me.friends.length > 0 ? (
          data.me.friends.map(friend => (
            <li key={friend._id}>{friend.username}</li>
          ))
        ) : (
          <li>No friends added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;


