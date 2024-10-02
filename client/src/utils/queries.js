import { gql } from '@apollo/client';

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

//get all users
export const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            _id
            username
            email
            booksRead {
                _id
                title
            }
            friends {
                _id
                username
            }
        }
    }
`;

//get a single user by ID
export const GET_USER_BY_ID = gql`
    query GetUserById($id: ID!) {
        user(_id: $id) {
            _id
            username
            email
            booksRead {
                _id
                title
            }
            friends {
                _id
                username
            }
        }
    }
`;

//get the logged-in user's pfrofile
export const GET_ME = gql`
    query GetMe {
        me {
            _id
            username
            email
            booksRead {
                _id
                title
            }
            friends {
                _id
                username
            }
        }
    }
`;

//get user by email
export const GET_USER_BY_EMAIL = gql`
    query GetUserByEmail($email: String!) {
        getUser(email: $email) {
            _id
            username
            email
            booksRead {
                _id
                title
            }
            friends {
                _id
                username
            }
        }
    }
`;

//get the user's wishcart (wishlist)
export const GET_USER_WISHCART = gql`
    query GetUserWishcart($userId: ID!) {
        getUserWishcart(user_Id: $userId) {
            _id
            isbn
            blob
        }
    }
`;