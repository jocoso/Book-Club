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
            return Book.find();
        },
        // Get a single book by ID
        book: async (parent, { _id }) => {
            return Book.findById(_id);
        },
        // Get a single book's data by ISBN 
        getBookData: async (parent, { isbn }) => {
            return Book.findOne({ isbn });
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
            return Review.find().populate({
              path: 'book',
              select: '_id isbn blob', // Ensure the fields to be selected
            }).populate('user');
          },
        // Get a single review by ID
        review: async (parent, { _id }) => {
            return Review.findById(_id).populate('user').populate('book');
        },
        // Get user's wishcart
        getUserWishcart: async (parent, { user_Id }) => {
            return Book.find({ _id: { $in: user_Id } });
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
        addBook: async (parent, { isbn, blob}) => {
            const bookExists = await Book.findOne({ isbn });
            if (bookExists) {
              throw new Error('Book with this ISBN already exists.');
            }
            const newBook = await Book.create({ isbn, blob });
            return newBook;
        },
        // Update a book's data
        updateBook: async (parent, { isbn, blob  }) => {
            return Book.findByIdAndUpdate(isbn, { blob  }, { new: true });
        },
        // Delete a book by ID
        deleteBook: async (parent, { isbn }) => {
            return Book.findByIdAndDelete(isbn);
        },
        // Add a new review to a book
        addReview: async (parent, { bookId, reviewText, rating, user, title, content, inks }) => {
            try {
              // Find the book to ensure it exists
              const book = await Book.findById(bookId);
              if (!book) {
                throw new Error('Book not found');
              }
      
              // Find the user to ensure it exists
              const userExists = await User.findById(user);
              if (!userExists) {
                throw new Error('User not found');
              }
      
              // Create a new review
              const newReview = await Review.create({
                bookId,
                reviewText,
                rating,
                user,
                title,
                content,
                inks,
              });
      
              // Optionally, you can push this review into the book's reviews array
              await Book.findByIdAndUpdate(bookId, { $push: { reviews: newReview._id } });
      
              return newReview;
            } catch (err) {
              console.error(err);
              throw new Error('Failed to add review');
            }
          },
        // Update a review by ID
        updateReview: async (parent, { _id, reviewText, rating, title, content, inks }) => {
            try {
              // Build an update object with only provided fields
              const updateFields = {};
              if (reviewText !== undefined) updateFields.reviewText = reviewText;
              if (rating !== undefined) updateFields.rating = rating;
              if (title !== undefined) updateFields.title = title;
              if (content !== undefined) updateFields.content = content;
              if (inks !== undefined) updateFields.inks = inks;
      
              const updatedReview = await Review.findByIdAndUpdate(_id, updateFields, { new: true }).populate('user').populate('book');
              return updatedReview;
            } catch (err) {
              console.error(err);
              throw new Error('Failed to update review');
            }
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
        },
        // Add a new discussion to a club
        addDiscussion: async (parent, { clubId, topic, content }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const discussion = await Discussion.create({ topic, content, username: context.user.username });
            await Club.findByIdAndUpdate(clubId, { $push: { discussions: discussion._id } });
            return discussion;
        },
        // Update a discussion by ID
        updateDiscussion: async (parent, { _id, topic, content }) => {
            return Discussion.findByIdAndUpdate(_id, { topic, content }, { new: true });
        },
        // Delete a discussion by ID
        deleteDiscussion: async (parent, { _id }) => {
            return Discussion.findByIdAndDelete(_id);
        },
    },
};

module.exports = resolvers;

