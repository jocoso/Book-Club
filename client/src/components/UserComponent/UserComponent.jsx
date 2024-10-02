import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../../utils/queries/userQueries";
import { ADD_FRIEND } from "../../utils/mutations/userMutations";

const UserComponent = () => {
    // State to store query results
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    const [addFriend] = useMutation(ADD_FRIEND); // Mutation for adding a friend

    // Handler function to add a friend
    const handleAddFriend = async (userId, friendId) => {
        try {
            const response = await addFriend({
                variables: { userId, friendId },
            });
            console.log("Friend added:", response.data.addFriend);
        } catch (err) {
            console.error("Error adding friend:", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data && data.users && data.users.length ? (
                <ul>
                    {/* Map through the users and display each one */}
                    {data.users.map((user) => (
                        <li key={user._id}>
                            {user.username} - {user.email}
                            <button
                                onClick={() =>
                                    handleAddFriend("loggedInUserId", user._id)
                                }
                            >
                                Add Friend
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found</p> // Display message when no users are available
            )}
        </div>
    );
};

export default UserComponent;
