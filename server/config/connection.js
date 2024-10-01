require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Get the URI from .env
    if (!uri) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if unable to connect
  }
};

// Call the connectDB function to initiate the connection
connectDB(); 

module.exports = { connectDB, connection: mongoose.connection };
