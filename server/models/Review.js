// Import Mongoose
const { Schema, model } = require('mongoose');

// Define the Review Schema
const reviewSchema = new Schema({
    reviewText: {
        type: String,
        required: 'You need to leave a review!',
        minlength: 1,
        maxlength: 280,
    },
    rating: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        virtuals: true,
    }
});

//Export Review model
const Review = model('Review', reviewSchema);

module.exports = Review;