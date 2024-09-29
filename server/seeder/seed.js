const db = require('../config/connection');
const { Book, Club, Comment, Post, User, Review } = require('../models');
// const userSeeds = require('./userSeeds.json'); // Adjust path if necessary
const bookSeeds = require('./bookSeeds.json');  //Adjust path if necessary
const reviewSeeds = require('./reviewSeeds.json'); // Adjust path if necessary
// const clubSeeds = require('./clubSeeds.json'); // Adjust path if necessary
// const commentSeeds = require('./commentSeeds.json'); // Adjust path if necessary
// const postSeeds = require('./postSeeds.json'); // Adjust path if necessary

// TODO: Test Seeder

// Add Seeds Here
// Book Seed Data
// const bookSeeds = [
//     {
//       title: 'To Kill a Mockingbird',
//       author: 'Harper Lee',
//       description: 'A novel about the serious issues of rape and racial inequality.',
//       image: 'https://books.google.com/books/content?id=PIW1CwAAQBAJ&printsec=frontcover&img=1&zoom=1',
//       isbn: '9780061120084',
//       blob: 5
//     },
//     {
//       title: '1984',
//       author: 'George Orwell',
//       description: 'A dystopian novel set in a totalitarian society under constant surveillance.',
//       image: 'https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1',
//       isbn: '9780547249643',
//       blob: 5
//     },
//     {
//       title: 'Brave New World',
//       author: 'Aldous Huxley',
//       description: 'A futuristic society controlled by technology and conditioning.',
//       image: 'https://books.google.com/books/content?id=ekd9xd4EpSIC&printsec=frontcover&img=1&zoom=1',
//       isbn: '9780060850524',
//       blob: 4
//     },
//     {
//       title: 'The Catcher in the Rye',
//       author: 'J.D. Salinger',
//       description: 'A story about teenage alienation and angst.',
//       image: 'https://books.google.com/books/content?id=3yI5V_0tTYQC&printsec=frontcover&img=1&zoom=1',
//       isbn: '9780316769174',
//       blob: 4
//     },
//     {
//       title: 'The Great Gatsby',
//       author: 'F. Scott Fitzgerald',
//       description: 'A novel about the American dream and the jazz age.',
//       image: 'https://books.google.com/books/content?id=eZ3J9alAKqsC&printsec=frontcover&img=1&zoom=1',
//       isbn: '9780743273565',
//       blob: 5
//     }
//   ];


// Function to clean the database collection
async function cleanDB(collection, collectionName) {
    try {
      await db.collection(collectionName).deleteMany({});
      console.log(`Cleared ${collectionName} collection`);
    } catch (err) {
      console.error(`Failed to clear ${collectionName} collection:`, err);
    }
  }

  const collections = [
    'book', // Books collection
    'user', // Users collection
    'club', // Clubs collection
    'comment', // Comments collection
    'post', // Posts collection
    'review' //Review collection
];

const seeders = [
    //! XXX: Add the schema and seeds in an object with attributes `schema`, `seed`
    // Example: {schema: Book, seed: bookSeeds}
    { schema: Book, seed: bookSeeds },
    { schema: User, seed: userSeeds },
    { schema: Review, seed: reviewSeeds },
    { schema: Club, seed: clubSeeds },
]

db.once('open', async() => {
    try {
        // Clean all collections
        // XXX: add collection name in collections array. Do not modify this.
        for(const collection of collections) {
            console.log(`Cleaning collection ${collection}s`);
            await cleanDB(collection, `${collection}s`);
        }

        // Seed the Collection
        // XXX: add schema and seed in the seeder Array. Do not modify this.
        for(const seed of seeders) {
            await seed.schema.create(seed.seed);
            console.log(`Seeded ${seed.schema.modelName} collection with data`);
        }

        console.log('Seeding completed successfully.');
        process.exit(0); // Exit the process after seeding is complete
    } catch(err) {
        // throw err;
        console.error('Error during seeding:', err);
        process.exit(1); // Exit with error
    }
})