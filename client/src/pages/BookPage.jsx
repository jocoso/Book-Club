import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Title from "../components/Title";

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
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    // Handle case where book data is not found
    if (!book) {
        return <div className="flex justify-center items-center h-screen">No book data available.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6 md:flex md:space-x-6">
                <div className="md:w-1/3 mb-6 md:mb-0">
                    {/* Placeholder for the book cover */}
                    <img 
                        src={book.bookData.image || "https://via.placeholder.com/300"} 
                        alt={book.bookData.title}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="md:w-2/3">
                    <Title className="text-3xl font-bold mb-4">{book.bookData.title}</Title>
                    <p className="text-gray-700 mb-6">{book.bookData.description}</p>
                    <p className="text-lg font-semibold mb-2">Author: <span className="text-gray-600">{book.bookData.author}</span></p>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
