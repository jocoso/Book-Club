import React from "react";
import { useQuery } from "@apollo/client";
import { GET_X_BOOKS } from "../../utils/queries/bookQueries";
import BookCard from "../BookCard";

const LimitedBookList = () => {
    const { loading, error, data } = useQuery(GET_X_BOOKS, {
        variables: { limit: 10 },
    });

    if (loading) return <p>Loading...</p>; // Display while loading data
    if (error) return <p>Error: {error.message}</p>; // Display on error
    return (
        <div>
            <ul>
                {/* Map through the users and display each one */}
                {data.books.map((book) => {
            console.log(book);
                    return (
                        <li key={book._id}>
                            <a href="/community">
                                <BookCard book={book} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LimitedBookList;
