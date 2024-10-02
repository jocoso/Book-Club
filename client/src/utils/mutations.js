import { gql } from "@apollo/client";

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
    mutation UpdateClub($name: String, $description: String, $img: String) {
        updateClub(name: $name, description: $description, img: $img) {
            _id
            name
            description
            img
        }
    }
`;

export const DELETE_CLUB = gql`
    mutation DeleteClub($_id: ID!) {
        deleteClub(_id: $_id) {
            _id
            name
            description
            image
        }
    }
`;

//Add new user
export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

//Mutation to log in an existing user
export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

//Mutation to update user information(username, email,password)
export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!
        $username: String
        $email: String
        $password: String
    ) {
        updateUser(
            _id: $id
            username: $username
            email: $email
            password: $password
        ) {
            _id
            username
            email
        }
    }
`;

//Mutation to delete user
export const DELETE_USER = gql`
    mutation Deleteuser($id: ID!) {
        deleteUser(_id: $id)
    }
`;

//Mutation to update user password
export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword(
        $id: ID!
        $lastPassword: String!
        $newPassword: String!
    ) {
        updatePassword(
            _id: $id
            lastPassword: $lastPassword
            newPassword: $newPassword
        ) {
            _id
            username
            email
        }
    }
`;

export const ADD_POST = gql`
    mutation AddPost(
        $title: String!
        $content: String!
        $club: ID!
        $author: ID!
        $media: [String!]
        $blob: Int
    ) {
        addPost(
            title: $title
            content: $content
            club: $club
            author: $author
            media: $media
            blob: $blob
        ) {
            _id
            title
            content
            club {
                _id
                name
            }
            author {
                _id
                username
            }
            media
            blob
        }
    }
`;

// Mutation to update username
export const UPDATE_USERNAME = gql`
    mutation UpdateUsername($id: ID!, $newUserName: String!) {
        updateUsername(_id: $id, newUserName: $newUserName) {
            _id
            username
            email
        }
    }
`;

//Mutation to update the email
export const UPDATE_EMAIL = gql`
    mutation UpdateEmail($id: ID!, $newEmail: String!) {
        updateEmail(_id: $id, newEmail: $newEmail) {
            _id
            username
            email
        }
    }
`;

//Mutation to add a friend
export const ADD_FRIEND = gql`
    mutation AddFriend($userid: ID!, $friendId: ID!) {
        addFriend(user_id: $userId, friend_Id: $friendId) {
            _id
            username
            friends {
                _id
                username
            }
        }
    }
`;
