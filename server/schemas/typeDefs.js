const { gql } = require('graphql-tag'); // Correct import for gql


// Define the GraphQL schema types, queries, and mutations
const typeDefs = gql`
  # User Type
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String! # Adding password field
    booksRead: [Book]
    friends: [User]
  }

  # Book Type
  type Book {
  _id: ID!
  isbn: Int!
  blob: Int
}
  
  # Comment Type
  type Comment {
    _id: ID!
    title: String!
    content: String
    author: User!
    blob: Int
  }

  # Comment Input Type
  input CommentInput {
    _id: ID!
    title: String!
    content: String
    author: ID! # Changed from User! to ID!
    blob: Int
}

  # Review Type
  type Review {
    _id: ID!
    reviewText: String!
    rating: Int!
<<<<<<< HEAD
    user: User
    book: Book
=======
    username: User!
    bookId: ID!
>>>>>>> 66d79dd5c22a5fa1f32fc5f8391663c53db17a0b
    createdAt: String
    title: String 
    content: String 
    inks: Int # Added to match group's "Inks (likes)" field
  }

  # Club Type
  type Club {
    _id: ID!
    clubName: String!
    description: String!
    img: String # Added field for image (with default handled in resolvers)
    members: [User]
    discussions: [Discussion]
    posts: [Post]
    memberCount: Int
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    blob: Int
    media: [String!]!
    comments: [Comment!]!
  }
  
  # Post Input Type
  input PostInput {
    _id: ID!
    title: String!
    content: String!
    author: ID! # Changed from User! to ID!
    blob: Int
    media: [String!]!
    comments: [CommentInput]
}

  # Discussion Type
  type Discussion {
    _id: ID!
    topic: String!
    content: String!
    username: String!
    createdAt: String
  }

  # Auth Type
  type Auth {
    token: ID!
    user: User
  }

  # Query Type Definitions
  type Query {
    # User Queries
    users: [User]
    user(_id: ID!): User
    me: User
    getUser(email: String!): User

    # Book Queries
    books: [Book]
    book(_id: ID!): Book
    getBookData(_id: ID!): Book

    # Club Queries
    clubs: [Club]
    club(_id: ID!): Club
    getAllClubs: [Club]

    # Discussion Queries
    discussions: [Discussion]
    discussion(_id: ID!): Discussion

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
    updateUser(_id: ID!, username: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    updatePassword(_id: ID!, lastPassword: String!, newPassword: String!): User
    updateUsername(_id: ID!, newUserName: String!): User
    updateEmail(_id: ID!, newEmail: String!): User
    addFriend(user_Id: ID!, friend_Id: ID!): [User]

    # Book Mutations
    addBook(title: String!, author: String!, description: String!, image: String): Book
    updateBook(_id: ID!, title: String, author: String, description: String, image: String): Book
    deleteBook(_id: ID!): Book

    # Review Mutations
    addReview(bookId: ID!, reviewText: String!, rating: Int!, user: ID!, title: String, content: String, inks: Int): Review
    updateReview(_id: ID!, reviewText: String, rating: Int, title: String, content: String, inks: Int): Review
    deleteReview(_id: ID!): Review


    # Comment Mutations (related to Book and Post)
    addComment(title: String!, content: String, author: ID!, blob: Int): Comment
    updateComment(_id: ID!, title: String, content: String, blob: Int): Comment
    deleteComment(_id: ID!): Comment

    # Club Mutations
    addClub(clubName: String!, description: String!, img: String): Club
    updateClub(_id: ID!, clubName: String, description: String, img: String): Club
    deleteClub(_id: ID!): Club

    # Post Mutations (related to Club)
    addPost(title: String!, content: String!, author: ID!, media: [String!]!, blob: Int): Post
    updatePost(_id: ID!, title: String, content: String, media: [String], blob: Int): Post
    deletePost(_id: ID!): Post

    # Discussion Mutations
    addDiscussion(clubId: ID!, topic: String!, content: String!): Discussion
    updateDiscussion(_id: ID!, topic: String, content: String): Discussion
    deleteDiscussion(_id: ID!): Discussion
  }
`;

module.exports = typeDefs;
