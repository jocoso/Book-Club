import { gql } from "@apollo/client";

//Mutation to get all clubs in database
export const GET_ALL_CLUBS = gql`
    query GetAllClubs {
        getAllClubs {
            _id
            name
            description
            img
            founder
            members
            posts
            memberCount
        }
    }
`;

// Mutation to get one club in the database
export const GET_CLUB_BY_ID = gql`
    query GetClub($_id: ID!) {
        getClub(_id: $_id) {
            _id
            name
            description
            img
            founder
            members
            posts
            memberCount
        }
    }
`;
