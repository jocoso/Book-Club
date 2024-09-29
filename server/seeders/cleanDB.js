const mongoose = require('mongoose');
const db = require('../config/connection'); 

module.exports = async (modelName, collectionName) => {
    try {
        if(db.readyState !== 1) {
            throw new Error('Database is not connected.');
        }

        const collections = await db.db.listCollections().toArray();
        const collectionExists = await db.db.listCollections({ name: collectionName }).toArray();

        if(collectionExists.length) {
            await db.db.dropCollection(collectionName);
            console.log(`Collection ${collectionName} dropped`);
        } else {
            console.log(`Collection ${collectionName} does not exists.`)
        }
    } catch (err) {
        console.log(`Error in dropping collection: ${err.message}`);
        throw err;
    }
}