// Import Mongoose and bcrypt for password hashing
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // References to the user's friends
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  // References to books read by the user
  booksRead: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }],
}, {
  toJSON: {
    virtuals: true,
  },
});

//Hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

//Method to compare input password with hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Exporting the User model
const User = model('User', userSchema);

module.exports = User;

