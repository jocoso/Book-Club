const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      isbn: {   // Replacing bookId with isbn
        type: String, 
        required: true  // Ensure the comment is linked to a book via its ISBN
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  );
  
//   const Comment = model('Comment', commentSchema);
  module.exports = commentSchema;
  