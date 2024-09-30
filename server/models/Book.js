const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
{
  isbn:{
    type: Number, 
    require: true, 
    unique: true
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
  }
);

const Book = model('Book', bookSchema);

module.exports = Book;
