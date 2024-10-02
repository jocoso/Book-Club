const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Book, Club, Post, Review } = require("../models");

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
        books: async (parent, { limit }) => {
            try {
                return await Book.find().limit(limit);
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
                return await Club.find()
                    .populate("founder")
                    .populate("members")
                    .populate({
                        path: "posts",
                        populate: {
                            path: "author",
                            select: "username",
                            match: { username: { $exists: true, $ne: null } }, // Ensure only valid users with a username are populated
                        },
                    });
            } catch (err) {
                throw new Error("Failed to fetch clubs");
            }
        },
        // Get a single club by ID
        club: async (parent, { _id }) => {
            try {
                const club = await Club.findById(_id)
                    .populate("members")
                    .populate("founder")
                    .populate("posts");
                if (!club) throw new Error("Club not found");
                return club;
            } catch (err) {
                throw new Error("Failed to fetch club");
            }
        },
        getAllReviews: async () => {
            try {
                return await Review.find()
                    .populate({
                        path: "book",
                        select: "_id blob title",
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
        getAllPostsOfAClub: async (_, { clubId }) => {
            try {
                const posts = await Post.find({ parentClub: clubId })
                    .populate("author", "username") // Populate author with just username
                    .populate("parentClub", "name"); // Optionally populate the club name
                return posts;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to retrieve posts for the club");
            }
        },
    },
    Mutation: {
        addPost: async (_, { title, content, club, author, media, blob }) => {
            try {
                // Validate the club and author
                const existingClub = await Club.findById(club);
                if (!existingClub) {
                    throw new Error("Club not found");
                }

                const existingUser = await User.findById(author);
                if (!existingUser) {
                    throw new Error("User not found");
                }

                // Create a new post
                const newPost = await Post.create({
                    title,
                    content,
                    parentClub: club, // Use parentClub in the Post model
                    author,
                    media,
                    blob,
                });

                // Add the post to the club's posts array
                existingClub.posts.push(newPost._id);
                await existingClub.save();

                // Optionally add the post to the author's posts array
                if (existingUser.posts) {
                    existingUser.posts.push(newPost._id);
                    await existingUser.save();
                }

                // Find the new post by its ID and populate the author and club fields
                const populatedPost = await Post.findById(newPost._id)
                    .populate("parentClub")
                    .populate("author");

                // Return the populated post
                return populatedPost;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to create post");
            }
        },

        // Create a new user
        addUser: async (parent, { username, email, password }) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                });

                const token = signToken(user);
                return { token, user };
            } catch (err) {
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
    },
};

module.exports = resolvers;
