const mongoose = require('mongoose');

module.exports = async (modelName, collectionName) => {
  try {
    if (mongoose.connection.readyState !== 1) { // Check if the connection is established
      throw new Error('Database is not connected.');
    }

    console.log(`Dropping collection ${collectionName}...`);
    const collections = await mongoose.connection.db.collections();
    if (collections.map(col => col.collectionName).includes(collectionName)) {
      await mongoose.connection.db.dropCollection(collectionName);
      console.log(`Collection ${collectionName} dropped successfully.`);
    } else {
      console.log(`Collection ${collectionName} does not exist.`);
    }
  } catch (err) {
    console.error(`Error in dropping collection: ${err.message}`);
  }
};
