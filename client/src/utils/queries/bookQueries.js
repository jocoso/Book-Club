import { gql } from "graphql-tag";

// Query to get all books in the database
export const GET_ALL_BOOKS = gql`
    query getBooks {
        books {
            isbn
            title
            author
            description
            image
            blob
        }
    }
`;

// Query to get a limited number of books
export const GET_X_BOOKS = gql`
    query Books($limit: Int) {
        books(limit: $limit) {
            _id
            isbn
            title
            author
            description
            image
            blob
        }
    }
`;
