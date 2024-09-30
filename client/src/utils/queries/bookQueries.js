import { gql } from "@apollo/client";

//Mutation to get all books in database
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
