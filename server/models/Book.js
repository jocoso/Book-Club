const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    isbn: {
      type: String, 
      required: true, // Corrected the typo here
      unique: true
    },
    title: {
      type: String
    },
    author: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    blob: {
      type: Number,
      default: 0,
    },
  }, 
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Optionally, create an index for performance if necessary
bookSchema.index({ isbn: 1 });

const Book = model('Book', bookSchema);

module.exports = Book;
