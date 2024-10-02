import { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext, getUserId } from '../../contexts/AuthContexts.js'; // Ensure correct import path
import { GET_ALL_USERS } from '../../utils/queries/queries.js';
import { ADD_FRIEND } from '../../utils/mutations/mutations.js';
import UserCard from '../UserCard/UserCard'; // Import your UserCard component

const UserComponent = () => {
  const { user } = useContext(AuthContext); // Access the logged-in user from AuthContext
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Local state for user ID
  const navigate = useNavigate(); // Initialize navigate

  // Query to get all users
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  
  // Mutation to add a friend
  const [addFriend] = useMutation(ADD_FRIEND);
  
  // Fetch the user ID from localStorage or context when the component mounts
  useEffect(() => {
    const userId = getUserId(); // Fetch user ID from localStorage
  
    if (userId) {
      setLoggedInUserId(userId); // Set the logged-in user ID in state
      console.log('Logged-in user ID:', userId); // Log the user ID
    } else {
      console.error('No logged-in user ID found');
    }
  }, []);

  // Handler function to add a friend
  const handleAddFriend = async (friendId) => {
    if (!loggedInUserId) {
      console.error('No logged-in user ID found');
      return; // Return early if the user is not logged in
    }

    try {
      const response = await addFriend({
        variables: { userId: loggedInUserId, friendId }, // Pass variables to the mutation
      });
      console.log('Friend added:', response.data.addFriend);
      
      // Navigate to the friend's profile after adding them
      navigate(`/users/${friendId}`); // Adjust the path as necessary based on your routing
    } catch (err) {
      console.error('Error adding friend:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="user-list">
      <h1>Welcome {user ? user.username : 'Guest'}</h1>
      {data && data.users && data.users.length ? (
        data.users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onAddFriend={handleAddFriend} // Pass the handler to the card component
            loggedInUserId={loggedInUserId} // Pass logged-in user ID to disable the button accordingly
          />
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserComponent;




