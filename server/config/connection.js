require('dotenv').config(); 
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book-club'
);


module.exports = mongoose.connection;
