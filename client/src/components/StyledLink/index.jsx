// src/components/StyledLink.jsx

import { Link } from "react-router-dom";

const StyledLink = ({ to, children, className = "", ...props }) => {
    return (
        <Link
            to={to}
            className={`text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};

export default StyledLink;
