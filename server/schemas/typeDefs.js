const { gql } = require("graphql-tag");

const typeDefs = gql`
    scalar Date

    # User Type
    type User {
        _id: ID!
        username: String!
        email: String!
        booksRead: [Book]
        friends: [User]
    }

    # Book Type
    type Book {
        _id: ID!
        isbn: String!
        title: String
        author: String
        description: String
        image: String
        blob: Int
    }

    # Comment Input Type
    input CommentInput {
        title: String!
        content: String
        author: ID!
        blob: Int
    }

    # Review Type
    type Review {
        _id: ID!
        reviewText: String!
        rating: Int!
        user: User!
        bookId: ID!
        createdAt: Date
        title: String
        content: String
        inks: Int
    }

    # Club Type
    type Club {
        _id: ID!
        name: String!
        description: String!
        img: String
        founder: User!
        members: [User!]
        posts: [Post!]
        memberCount: Int
    }

    type Post {
        _id: ID
        title: String
        content: String
        club: Club # This will refer to the "parentClub" field in MongoDB
        author: User
        blob: Int
        media: [String]
        createdAt: String
        updatedAt: String
    }

    # Post Input Type
    input PostInput {
        title: String!
        content: String!
        author: ID!
        blob: Int
        media: [String!]!
        comments: [CommentInput]
    }

    # Auth Type
    type Auth {
        token: ID!
        user: User
    }

    # Query Type Definitions
    type Query {
        users: [User]
        user(_id: ID!): User
        me: User
        getUser(email: String!): User
        books(limit: Int): [Book]
        book(_id: ID!): Book
        getBookData(isbn: String!): Book
        club(_id: ID!): Club
        clubs: [Club]
        getAllPostsOfAClub(clubId: ID!): [Post]

        # Review Queries
        getAllReviews: [Review]
        review(_id: ID!): Review

        # User's wishcart (for books)
        getUserWishcart(user_Id: ID!): [Book]
    }

    # Mutation Type Definitions
    type Mutation {
        # User Mutations
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(
            _id: ID!
            username: String
            email: String
            password: String
        ): User
        deleteUser(_id: ID!): Boolean
        updatePassword(
            _id: ID!
            lastPassword: String!
            newPassword: String!
        ): User
        updateUsername(_id: ID!, newUserName: String!): User
        updateEmail(_id: ID!, newEmail: String!): User
        addFriend(user_Id: ID!, friend_Id: ID!): User

        # Book Mutations
        addBook(
            _id: ID!
            isbn: String!
            title: String
            author: String
            description: String
            image: String
            blob: Int
        ): Book
        updateBook(
            _id: ID!
            isbn: String!
            title: String
            author: String
            description: String
            image: String
            blob: Int
        ): Book
        deleteBook(_id: ID!): Boolean

        # Review Mutations
        addReview(
            bookId: ID!
            reviewText: String!
            rating: Int!
            user: ID!
            title: String
            content: String
            inks: Int
        ): Review
        updateReview(
            _id: ID!
            reviewText: String
            rating: Int
            title: String
            content: String
            inks: Int
        ): Review
        deleteReview(_id: ID!): Boolean

        # Club Mutations
        addClub(
            name: String!
            description: String!
            img: String
            founder: ID!
        ): Club
        updateClub(
            _id: ID!
            name: String
            description: String
            img: String
        ): Club
        deleteClub(_id: ID!): Boolean

        # Post Mutations
        addPost(
            title: String!
            content: String!
            club: ID! 
            author: ID!
            media: [String!]
            blob: Int
        ): Post
        updatePost(
            _id: ID!
            title: String
            content: String
            media: [String!]
            blob: Int
        ): Post
        deletePost(_id: ID!): Boolean
    }
`;

module.exports = typeDefs;
