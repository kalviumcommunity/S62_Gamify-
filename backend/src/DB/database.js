if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: '../config/.env',
    });
}

const mongoose=require('mongoose');

const connectDatabase=()=>{
    
    mongoose
        .connect(process.env.DB_URL)
        .then((data)=>{
        console.log(`Database is connected Successfully: ${data.connection.host}`)
    })  .catch((err)=>console.log('database connection failed: ',err.message));
}

module.exports=connectDatabase;
