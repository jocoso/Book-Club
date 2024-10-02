
const connectDB = require('../config/connection'); // Import the connectDB and connection
const reviewSeeds = require("./reviewSeeds.json");
const userSeeds = require("./userSeeds.json");
const clubSeeds = require("./clubSeeds.json");
const postSeeds = require("./postSeeds.json");
const { Club, Post, User, Review } = require("../models");
const cleanDB = require("./cleanDB");

const seeders = [
  { name: "user", schema: User, seed: userSeeds },
  { name: "review", schema: Review, seed: reviewSeeds },
  { name: "club", schema: Club, seed: clubSeeds },
  { name: "post", schema: Post, seed: postSeeds },
];

// Seed the database
const seedDatabase = async () => {
    try {
      // Wait until the connection is open before proceeding
      connectDB.once('open', async () => {
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




