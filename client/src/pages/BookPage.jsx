import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookPage = () => {
    const { isbn } = useParams(); // Get ISBN from the route parameters
    const [book, setBook] = useState(null); // State to store the fetched book data
    const [error, setError] = useState(null); // State to store errors
    const [loading, setLoading] = useState(true); // State to handle loading

    const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"; // Use Vite's env or fallback
    const fetchURL = `${baseURL}/api/bookdata/${isbn}`;

    useEffect(() => {
        // Fetch the book data
        fetch(fetchURL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        `Error fetching book data: ${res.statusText}`
                    );
                }
                return res.json();
            })
            .then((bookData) => {
                setBook(bookData); // Update the book state with the fetched data
                setLoading(false); // Set loading to false
            })
            .catch((error) => {
                setError(error.message); // Store the error message
                setLoading(false); // Set loading to false even if there is an error
            });
    }, [isbn, fetchURL]); // Dependencies for the effect to run when isbn or fetchURL changes

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Handle case where book data is not found
    if (!book) {
        return <div>No book data available.</div>;
    }
    

    return (
        <div>
            <Link to="/">Back</Link>
            <h1>{book.bookData.title}</h1>
            <p>{book.bookData.description}</p>
            <p>Author: {book.bookData.author}</p>
        </div>
    );
};

export default BookPage;
