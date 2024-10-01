// const mongoose = require('mongoose');
// require('dotenv').config(); 

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/social-book-review', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    
    const connection = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/social-book-review', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    return connection;

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// require('dotenv').config(); 
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URI; // Check if the URI is correctly loaded
//     if (!uri) {
//       throw new Error('MONGO_URI is not defined in the environment variables');
//     }

//     await mongoose.connect(uri, {
//       ssl: true,
//       // tlsAllowInvalidCertificates: true, // Use this for testing only. Remove it for production.
//       tlsInsecure: true // This disables certificate validation. Use it for testing only.
//     });

//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// };

// console.log(process.env.MONGO_URI);


// connectDB(); 

// module.exports = { connectDB, connection: mongoose.connection };

