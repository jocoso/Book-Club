const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image : {
        type: String, // URL to the book cover image
        trim: true,
        required: false
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      }
    ],
    comments: [
      {
      type: Schema.Types.ObjectId, 
      ref: 'Comment',
      },
    ],
    blob: {
      type: Number,
      default: 0,
    },
 }, 
 {
    toJSON: {
      virtuals: true,
    },
  }
);

const Book = model('Book', bookSchema);

module.exports = Book;
