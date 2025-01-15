const mongoose =require('mongoose');
require('dotenv').config();

const connectDB=async()=>{
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((data) => {
               console.log(`Database is connected successfully: ${data.connection.host}`)
             })
}

module.exports=connectDB