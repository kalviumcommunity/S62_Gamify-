const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    mongoose.connect(process.env.DB_URL)
        .then((data) => {
            console.log(`Database is connected successfully: ${data.connection.host}`);
        })
        .catch((error) => {
            console.error("Database connection error:", error);
        });
}

module.exports = connectDB;
