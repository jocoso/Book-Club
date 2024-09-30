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
