const db = require('../config/connection');
const bookSeeds = require('./bookSeeds.json');  //Adjust path if necessary
const reviewSeeds = require('./reviewSeeds.json'); // Adjust path if necessary
const userSeeds = require('./userSeeds.json');
const clubSeeds = require('./clubSeeds.json');
const { Book, Club, Comment, Post, User, Review } = require('../models');
const cleanDB = require('./cleanDB');



// TODO: Test Seeder

const seeders = [
    //! XXX: Add the schema and seeds in an object with attributes `schema`, `seed`
    // Example: {schema: Book, seed: bookSeeds}
    {name:'book', schema: Book, seed: bookSeeds },
    {name:'user', schema: User, seed: userSeeds },
    {name: 'review', schema: Review, seed: reviewSeeds },
    {name:'clubs', schema: Club, seed: clubSeeds },
    {name:'post', schema: Post, seed: postSeeds },
    {name:'comment', schema: Comment, seed: commentSeeds },
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