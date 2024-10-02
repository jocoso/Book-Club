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
        <div>
            <ul>
                {data.books.map((book) => (
                    <li key={book._id}>
                        <Link to="/community">
                            <BookCard book={book} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LimitedBookList;
