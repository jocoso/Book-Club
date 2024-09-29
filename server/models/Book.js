const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
{
   _id:{
    type: String, 
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
