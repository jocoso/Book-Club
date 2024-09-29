// Import Mongoose
const { Schema, model } = require('mongoose');

// Define the Review Schema
const reviewSchema = new Schema(
  {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User collection
      required: false,
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
      },
      content: {
        type: String,
      },
      inks: {
        type: Number,
        default: 0,
      },
    },
    {
 
    toJSON: {
        virtuals: true,
    }
  }
);

//Export Review model
const Review = model('Review', reviewSchema);

module.exports = Review;