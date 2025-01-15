if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}

const { MongoClient } = require('mongodb');

console.log(process.env.DB_URL);

const mongoConnection = new MongoClient(process.env.DB_URL);

async function getDB() {
    try {
        await mongoConnection.connect(); // Ensure the connection is made
        const db = mongoConnection.db("ASAP").collection('User ');
        return db;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}

getDB();

module.exports = { getDB, mongoConnection };