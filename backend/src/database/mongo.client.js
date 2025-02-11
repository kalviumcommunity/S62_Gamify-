
require("dotenv").config();
const multer=require('multer')
const { MongoClient } = require("mongodb");

const mongoConnection = new MongoClient(process.env.DB_URL);

async function getDB() {
  try {
    await mongoConnection.connect(); // Ensure the connection is made
    const db = mongoConnection.db("ASAP").collection("games"); // Fixed collection name
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, file.originalName);
  }
});

const upload=multer({storage:storage})


module.exports = { getDB, mongoConnection, upload};
