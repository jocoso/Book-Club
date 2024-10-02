import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import { GET_X_BOOKS } from "../../utils/queries";

const LimitedBookList = () => {
    const { loading, error, data } = useQuery(GET_X_BOOKS, {
        variables: { limit: 10 },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {data.books.map((book) => (
                <div key={book._id} className="col-span-1">
                    <Link to={`/books/${book.isbn}`}>
                        <BookCard book={book} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default LimitedBookList;
