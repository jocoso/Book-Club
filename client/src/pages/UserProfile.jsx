import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../utils/queries/userQueries";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { userId } = useParams(); // Get the user ID from the URL parameters
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id: userId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { username, email, friends } = data.user;

    return (
        <div>
            <h1>{username}'s Profile</h1>
            <p>Email: {email}</p>
            <h3>Friends:</h3>
            <ul>
                {friends.map((friend) => (
                    <li key={friend._id}>{friend.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
