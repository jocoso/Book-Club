const { AuthenticationError } = require('@apollo/server'); // Replace with proper error handling package if needed
const { signToken } = require('../utils/auth');
const { User, Book, Club, Comment, Post, Review } = require('../models');


const resolvers = {
    Query: {
        // Get all users
        users: async () => {
            return User.find().populate('booksRead').populate('friends');
        },
        // Get a single user by ID
        user: async (parent, { _id }) => {
            return User.findById(_id).populate('booksRead').populate('friends');
        },
        // Get logged-in user's data
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user._id).populate('booksRead').populate('friends');
            }
            throw new AuthenticationError('Not logged in');
        },
        // Get a single user by email
        getUser: async (parent, { email }) => {
            return User.findOne({ email }).populate('booksRead').populate('friends');
        },
        // Get all books
        books: async () => {
            return Book.find().populate('reviews').populate('comments');
        },
        // Get a single book by ID
        book: async (parent, { _id }) => {
            return Book.findById(_id).populate('reviews').populate('comments');
        },
        // Get a single book's data by ISBN 
        getBookData: async (parent, { _id }) => {
            return Book.findOne({ isbn }).populate('reviews').populate('comments');
        },
        // Get all clubs
        clubs: async () => {
            return Club.find().populate('members').populate('posts').populate('discussions');
        },
        // Get a single club by ID
        club: async (parent, { _id }) => {
            return Club.findById(_id).populate('members').populate('posts').populate('discussions');
        },
        // Get all clubs with specific data
        getAllClubs: async () => {
            return Club.find().populate('members').populate('posts').populate('discussions');
        },
        // Get all discussions
        discussions: async () => {
            return Discussion.find();
        },
        // Get a single discussion by ID
        discussion: async (parent, { _id }) => {
            return Discussion.findById(_id);
        },
        // Get all reviews
        getAllReviews: async () => {
            return Review.find();
        },
        // Get user's wishcart
        getUserWishcart: async (parent, { user_Id }) => {
            return Book.find({ _id: { $in: user_Id } }).populate('comments').populate('reviews');
        },
    },
    Mutation: {
        // Create a new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // Login an existing user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        // Update user data
        updateUser: async (parent, { _id, username, email, password }, context) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError('Not authorized');
            }
            return User.findByIdAndUpdate(_id, { username, email, password }, { new: true });
        },
        // Delete a user by ID
        deleteUser: async (parent, { _id }, context) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError('Not authorized');
            }
            return User.findByIdAndDelete(_id);
        },
        // Update user password
        updatePassword: async (parent, { _id, lastPassword, newPassword }, context) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError('Not authorized');
            }
            const user = await User.findById(_id);
            const correctPw = await user.isCorrectPassword(lastPassword);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }
            user.password = newPassword;
            await user.save();
            return user;
        },
        // Update user username
        updateUsername: async (parent, { _id, newUserName }, context) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError('Not authorized');
            }
            return User.findByIdAndUpdate(_id, { username: newUserName }, { new: true });
        },
        // Update user email
        updateEmail: async (parent, { _id, newEmail }, context) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError('Not authorized');
            }
            return User.findByIdAndUpdate(_id, { email: newEmail }, { new: true });
        },
        // Add a friend to a user
        addFriend: async (parent, { user_Id, friend_Id }, context) => {
            if (!context.user || context.user._id !== user_Id) {
                throw new AuthenticationError('Not authorized');
            }
            const user = await User.findById(user_Id);
            if (user.friends.includes(friend_Id)) {
                throw new Error('Already friends');
            }
            user.friends.push(friend_Id);
            await user.save();
            return user.populate('friends').execPopulate();
        },
        // Add a new book
        addBook: async (parent, args) => {
            return Book.create(args);
        },
        // Update a book's data
        updateBook: async (parent, { _id, title, author, description, image }) => {
            return Book.findByIdAndUpdate(_id, { title, author, description, image }, { new: true });
        },
        // Delete a book by ID
        deleteBook: async (parent, { _id }) => {
            return Book.findByIdAndDelete(_id);
        },
        // Add a new review to a book
        addReview: async (parent, { bookId, reviewText, rating }) => {
            const review = await Review.create({ bookId, reviewText, rating });
            await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });
            return review;
        },
        // Update a review by ID
        updateReview: async (parent, { _id, reviewText, rating }) => {
            return Review.findByIdAndUpdate(_id, { reviewText, rating }, { new: true });
        },
        // Delete a review by ID
        deleteReview: async (parent, { _id }) => {
            return Review.findByIdAndDelete(_id);
        },
        // Add a new comment to a post or book
        addComment: async (parent, { title, content, author, blob }) => {
            const comment = await Comment.create({ title, content, author, blob });
            await Book.findByIdAndUpdate(author, { $push: { comments: comment._id } });
            return comment;
        },
        // Update a comment by ID
        updateComment: async (parent, { _id, title, content, blob }) => {
            return Comment.findByIdAndUpdate(_id, { title, content, blob }, { new: true });
        },
        // Delete a comment by ID
        deleteComment: async (parent, { _id }) => {
            return Comment.findByIdAndDelete(_id);
        },
        // Add a new club
        addClub: async (parent, args) => {
            return Club.create(args);
        },
        // Update a club's data
        updateClub: async (parent, { _id, clubName, description, img }) => {
            return Club.findByIdAndUpdate(_id, { clubName, description, img }, { new: true });
        },
        // Delete a club by ID
        deleteClub: async (parent, { _id }) => {
            return Club.findByIdAndDelete(_id);
        },
        // Add a new post to a club
        addPost: async (parent, { title, content, author, media, blob }) => {
            return Post.create({ title, content, author, media, blob });
        },
        // Update a post by ID
        updatePost: async (parent, { _id, title, content, media, blob }) => {
            return Post.findByIdAndUpdate(_id, { title, content, media, blob }, { new: true });
        },
        // Delete a post by ID
        deletePost: async (parent, { _id }) => {
            return Post.findByIdAndDelete(_id);
        }
    },
};

module.exports = resolvers;

