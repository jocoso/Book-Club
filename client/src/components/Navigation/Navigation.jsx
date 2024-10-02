import { Link } from "react-router-dom";

// Assuming UserContext is already created and provided higher up in the app


const Navigation = () => {
    // Access the UserContext


    // Function to handle logout


    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/communities">Communities</Link>
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
            </ul>
        </nav>
    );
};

export default Navigation;
