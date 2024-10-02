const { Review } = require('../models');
const mongoose = require('mongoose');
const Librarian = require('./utils/Librarian');
const Book = require('./models/Book');


const reviewData = [
  {
    rating: 5,
    review_text: 'An amazing book that changed my life!',
    user_id: 1,    
    book_id: 1    
  },
  {
    rating: 4,
    review_text: 'A great read, but could have been shorter.',
    user_id: 2,
    book_id: 2
  }
];

async function seedReviews() {
  try {
    await Review.bulkCreate(reviewData);
    console.log('Reviews seeded successfully');
  } catch (err) {
    console.error('Error seeding reviews:', err);
  }
}

module.exports = seedReviews;
