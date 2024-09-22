const mongoose = require('mongoose');
require('dotenv').config(); //Load environment variables from .env file

//Connect to MongoDB using URI from .env file or fallback lo lcalhost
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-book-review', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;