const db = require('../config/connection');
const { Book, Club, Comment, Discussion, Post, User } = require('../models');

// TODO: Test Seeder

// Add Seeds Here

const collections = [
    //! XXX: Add the collection name (lowercase) here
    // example: 'book'
]

const seeders = [
    //! XXX: Add the schema and seeds in an object with attributes `schema`, `seed`
    // Example: {schema: Book, seed: bookSeeds}
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
        }
    } catch(err) {
        throw err;
    }
})