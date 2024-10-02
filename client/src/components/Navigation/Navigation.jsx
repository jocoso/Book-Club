import { useContext } from "react";
import { Link } from "react-router-dom";

// Assuming UserContext is already created and provided higher up in the app
import { UserContext } from "../contexts/UserContext";

const Navigation = () => {
    // Access the UserContext
    const { user, setUser } = useContext(UserContext);

    // Function to handle logout
    const handleLogout = () => {
        setUser(null); // Set user to null, effectively logging out
        // Additional logout logic, such as clearing tokens or redirecting
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/book-clubs">Book Clubs</Link>
                </li>
                <li>
                    <Link to="/discussions/clubId">Discussions</Link>
                </li>
                <li>
                    <Link to="/reviews/bookId">Reviews</Link>
                </li>
                <li>
                    <Link to="/user-profile">Profile</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link to="/user-settings">Settings</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
