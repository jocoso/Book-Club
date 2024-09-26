const { Book } = require('../models'); 

const bookData = [
  { title: 'Dune', author: 'Frank Herbert', club_id: 1 },
  { title: 'Harry Potter', author: 'J.K. Rowling', club_id: 2 }
];

async function seedBooks() {
  try {
    await Book.bulkCreate(bookData);
    console.log('Books seeded successfully');
  } catch (err) {
    console.error('Error seeding books:', err);
  }
}

module.exports = seedBooks;
