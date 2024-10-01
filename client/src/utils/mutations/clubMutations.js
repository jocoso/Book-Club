import { gql } from "graphql-tag";

// Adds a club
export const ADD_CLUB = gql`
    mutation AddClub(
        $name: String!
        $description: String!
        $img: String
        $founder: ID!
    ) {
        addClub(
            name: $name
            description: $description
            img: $img
            founder: $founder
        ) {
            _id
            name
            description
            img
            founder {
                _id
                username
            }
        }
    }
`;

// Update clubs
export const UPDATE_CLUB = gql`
    mutation UpdateClub(
        $name: String
        $description: String
        $img: String
    ) {
        updateClub(
            name: $name
            description: $description
            img: $img
        ) {
            _id
            name
            description
            img    
        }
    }
`;

export const DELETE_CLUB = gql`
    mutation DeleteClub($_id) {
        deleteClub(_id: $_id) {
            _id
            name
            description
            image
        }
    }
`;