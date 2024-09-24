const db = require('../config/connection');

const { Book, Club, Comment, Discussion, Post, User } = require('../models');
const cleanDB = require('./cleanDB');

const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');

// TODO: Test Seeder

const seeders = [
    //! XXX: Add the schema and seeds in an object with attributes `schema`, `seed`
    // Example: {schema: Book, seed: bookSeeds}
    {name: 'user', schema: User, seed: userSeeds},
    {name: 'post', schema: Post, seed: postSeeds},
]

db.once('open', async() => {
    try {
        // Clean and seed all collections
        // XXX: Do not modify this.
        for(const seed of seeders) {
            console.log(`Cleaning ${seed.name}s...`);
            await cleanDB(seed.name, `${seed.name}s`);

            console.log(`Seeding ${seed.name}s...`);
            await seed.schema.create(seed.seed);
        }

        console.log('All done!');
        process.exit(0);
    } catch(err) {
        throw err;
    }
})