const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express"); // Use proper package for error handling
const { signToken } = require("../utils/auth");
const { User, Book, Club, Comment, Post, Review } = require("../models");

const resolvers = {
    Query: {
        // Get all users
        users: async () => {
            try {
                return await User.find()
                    .populate("booksRead")
                    .populate("friends");
            } catch (err) {
                throw new Error("Failed to fetch users");
            }
        },
        // Get a single user by ID
        user: async (parent, { _id }) => {
            try {
                return await User.findById(_id)
                    .populate("booksRead")
                    .populate("friends");
            } catch (err) {
                throw new Error("Failed to fetch user");
            }
        },
        // Get logged-in user's data
        me: async (parent, args, context) => {
            if (context.user) {
                try {
                    return await User.findById(context.user._id)
                        .populate("booksRead")
                        .populate("friends");
                } catch (err) {
                    throw new Error("Failed to fetch logged-in user's data");
                }
            }
            throw new AuthenticationError("Not logged in");
        },
        // Get a single user by email
        getUser: async (parent, { email }) => {
            try {
                return await User.findOne({ email })
                    .populate("booksRead")
                    .populate("friends");
            } catch (err) {
                throw new Error("Failed to fetch user by email");
            }
        },
        // Get all books
        books: async () => {
            try {
                return await Book.find();
            } catch (err) {
                throw new Error("Failed to fetch books");
            }
        },
        // Get a single book by ISBN
        book: async (parent, { isbn }) => {
            try {
                return await Book.findOne({ isbn });
            } catch (err) {
                throw new Error("Failed to fetch book by ISBN");
            }
        },
        // Get all clubs
        clubs: async () => {
            try {
                return await Club.find().populate("members").populate("posts");
            } catch (err) {
                throw new Error("Failed to fetch clubs");
            }
        },
        // Get a single club by ID
        club: async (parent, { _id }) => {
            try {
                return await Club.findById(_id)
                    .populate("members")
                    .populate("posts");
            } catch (err) {
                throw new Error("Failed to fetch club");
            }
        },
        // Get all comments
        comments: async () => {
            try {
                return await Comment.find().populate({
                    path: "author",
                    model: "User",
                });
            } catch (err) {
                throw new Error("Failed to fetch comments");
            }
        },
        // Get a single comment by ID
        comment: async (parent, { _id }) => {
            try {
                return await Comment.findById(_id).populate("author");
            } catch (err) {
                throw new Error("Failed to fetch comment");
            }
        },
        // Get all reviews
        getAllReviews: async () => {
            try {
                return await Review.find()
                    .populate({
                        path: "book",
                        select: "_id blob title", // Adjusted to include title
                    })
                    .populate("user");
            } catch (err) {
                throw new Error("Failed to fetch reviews");
            }
        },
        // Get user's wishcart
        getUserWishcart: async (parent, { user_Id }) => {
            try {
                const user = await User.findById(user_Id).populate("wishcart");
                return user.wishcart;
            } catch (err) {
                throw new Error("Failed to fetch user's wishcart");
            }
        },
    },
    Mutation: {
        // Create a new user
        addUser: async (parent, { username, email, password }) => {
            try {
                console.log("Hashing password for:", email); // Debug line

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                console.log("Password hashed successfully:", hashedPassword); // Debug line

                // Create the new user with the hashed password
                const user = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                });

                console.log("User created successfully:", user); // Debug line

                // Generate a token
                const token = signToken(user);

                return { token, user };
            } catch (err) {
                console.error("Error in addUser resolver:", err); // More detailed error
                throw new Error("Failed to create user");
            }
        },
        // Login an existing user
        login: async (parent, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError("Incorrect credentials");
                }
                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) {
                    throw new AuthenticationError("Incorrect credentials");
                }
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                throw new Error("Failed to login");
            }
        },
        // Update user data
        updateUser: async (
            parent,
            { _id, username, email, password },
            context
        ) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                const updateFields = {};
                if (username) updateFields.username = username;
                if (email) updateFields.email = email;
                if (password) updateFields.password = password;

                return await User.findByIdAndUpdate(_id, updateFields, {
                    new: true,
                });
            } catch (err) {
                throw new Error("Failed to update user");
            }
        },
        // Delete a user by ID
        deleteUser: async (parent, { _id }, context) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                return await User.findByIdAndDelete(_id);
            } catch (err) {
                throw new Error("Failed to delete user");
            }
        },
        // Update user password
        updatePassword: async (
            parent,
            { _id, lastPassword, newPassword },
            context
        ) => {
            if (!context.user || context.user._id !== _id) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                const user = await User.findById(_id);
                const correctPw = await user.isCorrectPassword(lastPassword);
                if (!correctPw) {
                    throw new AuthenticationError("Incorrect password");
                }
                user.password = newPassword;
                await user.save();
                return user;
            } catch (err) {
                throw new Error("Failed to update password");
            }
        },
        // Add a friend to a user
        addFriend: async (parent, { user_Id, friend_Id }, context) => {
            if (!context.user || context.user._id !== user_Id) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                const user = await User.findById(user_Id);
                if (user.friends.includes(friend_Id)) {
                    throw new Error("Already friends");
                }
                user.friends.push(friend_Id);
                await user.save();
                await user.populate("friends");
                return user;
            } catch (err) {
                throw new Error("Failed to add friend");
            }
        },
        // Add a new book
        addBook: async (
            parent,
            { _id, blob, title, author, description, image }
        ) => {
            try {
                const bookExists = await Book.findOne({ _id });
                if (bookExists) {
                    throw new Error("Book with this ISBN already exists.");
                }
                return await Book.create({
                    _id,
                    blob,
                    title,
                    author,
                    description,
                    image,
                });
            } catch (err) {
                throw new Error("Failed to add book");
            }
        },
        // Update a book's data
        updateBook: async (
            parent,
            { isbn, blob, title, author, description, image }
        ) => {
            try {
                return await Book.findByIdAndUpdate(
                    isbn,
                    { blob, title, author, description, image },
                    { new: true }
                );
            } catch (err) {
                throw new Error("Failed to update book");
            }
        },
        // Delete a book by ID
        deleteBook: async (parent, { _id }) => {
            try {
                return await Book.findByIdAndDelete(_id);
            } catch (err) {
                throw new Error("Failed to delete book");
            }
        },
        // Add a new review to a book
        addReview: async (
            parent,
            { bookId, reviewText, rating, user, title, content, inks }
        ) => {
            try {
                const book = await Book.findById(bookId);
                if (!book) {
                    throw new Error("Book not found");
                }

                const userExists = await User.findById(user);
                if (!userExists) {
                    throw new Error("User not found");
                }

                const newReview = await Review.create({
                    bookId,
                    reviewText,
                    rating,
                    user,
                    title,
                    content,
                    inks,
                });

                await Book.findByIdAndUpdate(bookId, {
                    $push: { reviews: newReview._id },
                });

                return newReview;
            } catch (err) {
                throw new Error("Failed to add review");
            }
        },
        // Update a review by ID
        updateReview: async (
            parent,
            { _id, reviewText, rating, title, content, inks }
        ) => {
            try {
                const updateFields = {};
                if (reviewText !== undefined)
                    updateFields.reviewText = reviewText;
                if (rating !== undefined) updateFields.rating = rating;
                if (title !== undefined) updateFields.title = title;
                if (content !== undefined) updateFields.content = content;
                if (inks !== undefined) updateFields.inks = inks;

                return await Review.findByIdAndUpdate(_id, updateFields, {
                    new: true,
                })
                    .populate("user")
                    .populate("book");
            } catch (err) {
                throw new Error("Failed to update review");
            }
        },
        // Delete a review by ID
        deleteReview: async (parent, { _id }) => {
            try {
                return await Review.findByIdAndDelete(_id);
            } catch (err) {
                throw new Error("Failed to delete review");
            }
        },
        // Add a new comment to a post or book
        addComment: async (parent, { title, content, author, blob }) => {
            try {
                const comment = await Comment.create({
                    title,
                    content,
                    author,
                    blob,
                });
                await Book.findByIdAndUpdate(author, {
                    $push: { comments: comment._id },
                });
                return comment;
            } catch (err) {
                throw new Error("Failed to add comment");
            }
        },
        // Update a comment by ID
        updateComment: async (parent, { _id, title, content, blob }) => {
            try {
                return await Comment.findByIdAndUpdate(
                    _id,
                    { title, content, blob },
                    { new: true }
                );
            } catch (err) {
                throw new Error("Failed to update comment");
            }
        },
        // Delete a comment by ID
        deleteComment: async (parent, { _id }) => {
            try {
                return await Comment.findByIdAndDelete(_id);
            } catch (err) {
                throw new Error("Failed to delete comment");
            }
        },
        // Add a new club
        addClub: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                return await Club.create(args);
            } catch (err) {
                throw new Error("Failed to create club");
            }
        },
        // Update a club's data
        updateClub: async (
            parent,
            { _id, clubName, description, img },
            context
        ) => {
            if (!context.user) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                return await Club.findByIdAndUpdate(
                    _id,
                    { clubName, description, img },
                    { new: true }
                );
            } catch (err) {
                throw new Error("Failed to update club");
            }
        },
        // Delete a club by ID
        deleteClub: async (parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                return await Club.findByIdAndDelete(_id);
            } catch (err) {
                throw new Error("Failed to delete club");
            }
        },
        // Add a new post to a club
        addPost: async (
            parent,
            { title, content, parentClub, author, media, blob },
            context
        ) => {
            if (!context.user) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                return await Post.create({
                    title,
                    content,
                    parentClub,
                    author,
                    media,
                    blob,
                });
            } catch (err) {
                throw new Error("Failed to add post");
            }
        },
        // Update a post by ID
        updatePost: async (
            parent,
            { _id, title, content, media, blob },
            context
        ) => {
            if (!context.user) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                return await Post.findByIdAndUpdate(
                    _id,
                    { title, content, media, blob },
                    { new: true }
                );
            } catch (err) {
                throw new Error("Failed to update post");
            }
        },
        // Delete a post by ID
        deletePost: async (parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError("Not authorized");
            }
            try {
                return await Post.findByIdAndDelete(_id);
            } catch (err) {
                throw new Error("Failed to delete post");
            }
        },
    },
};

module.exports = resolvers;
