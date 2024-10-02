

const UserCard = ({ user, onAddFriend, loggedInUserId }) => {
  return (
    <div className="user-card">
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <button
        onClick={() => onAddFriend(user._id)}
        disabled={!loggedInUserId} // Disable button if no user is logged in
      >
        Add Friend
      </button>
    </div>
  );
};

export default UserCard;

