import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 p-4 mb-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg">Book-Club</div>
                <button
                    className="text-white block md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        ></path>
                    </svg>
                </button>
                <ul
                    className={`${
                        isOpen ? "block" : "hidden"
                    } md:flex md:space-x-6 text-white text-lg`}
                >
                    <li className="hover:text-yellow-400">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="hover:text-yellow-400">
                        <Link to="/communities">Communities</Link>
                    </li>
                    <li className="hover:text-yellow-400">
                        <Link to="/discussions">Discussions</Link>
                    </li>
                    <li className="hover:text-yellow-400">
                        <Link to="/reviews/bookId">Reviews</Link>
                    </li>
                    <li className="hover:text-yellow-400">
                        <Link to="/user-profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
