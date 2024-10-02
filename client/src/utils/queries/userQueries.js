import { gql } from '@apollo/client';
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
