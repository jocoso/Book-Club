import { gql } from '@apollo/client';

// Query to get all clubs in the database
export const GET_ALL_CLUBS = gql`
    query Clubs {
        clubs {
            _id
            description
            founder {
                _id
                username
            }
            name
            img
            posts {
                _id
                title
                content
                author {
                    _id
                    username
                }
                blob
                media
                comments {
                    _id
                    title
                    content
                    author {
                        _id
                        username
                    }
                    blob
                    createdAt
                    updatedAt
                }
            }
            memberCount
        }
    }
`;

// Query to get one club by its ID in the database
export const GET_CLUB_BY_ID = gql`
    query getClub($_id: ID!) {
        club(_id: $_id) {
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
