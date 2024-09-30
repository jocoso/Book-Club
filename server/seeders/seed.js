
13
const { connectDB, connection } = require('../config/connection'); // Import the connectDB and connection
const bookSeeds = require("./bookSeeds.json");
const reviewSeeds = require("./reviewSeeds.json");
const userSeeds = require("./userSeeds.json");
const clubSeeds = require("./clubSeeds.json");
const postSeeds = require("./postSeeds.json");
const commentSeeds = require("./commentSeeds.json");
const { Book, Club, Comment, Post, User, Review } = require("../models");
const cleanDB = require("./cleanDB");

const seeders = [
  { name: "book", schema: Book, seed: bookSeeds },
  { name: "user", schema: User, seed: userSeeds },
  { name: "review", schema: Review, seed: reviewSeeds },
  { name: "club", schema: Club, seed: clubSeeds },
  { name: "post", schema: Post, seed: postSeeds },
  { name: "comment", schema: Comment, seed: commentSeeds },
];

// Seed the database
const seedDatabase = async () => {
    try {
      // Connect to MongoDB
      await connectDB();
  
      // Wait until the connection is open before proceeding
      connection.once('open', async () => {
        try {
          // Clean and seed all collections
          for (const seed of seeders) {
            console.log(`Cleaning ${seed.name}s...`);
            await cleanDB(seed.name, `${seed.name}s`);
  
            console.log(`Seeding ${seed.name}s...`);
            await seed.schema.create(seed.seed);
          }
  
          console.log('All done!');
          process.exit(0); // Exit on success
        } catch (err) {
          console.error('Error during seeding:', err);
          process.exit(1); // Exit on failure
        }
      });
    } catch (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }
  };
  
  // Run the seeder
  seedDatabase();




