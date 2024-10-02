import { gql } from "graphql-tag";

//Add new user
export const SIGNUP_USER = gql`
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
  mutation AddFriend($user_Id: ID!, $friend_Id: ID!) {
    addFriend(user_Id: $user_Id, friend_Id: $friend_Id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;