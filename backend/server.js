const express=require('express');
const mongoose=require('mongoose');
const app=express();
const connectDB=require('./src/database/database.js');
const dotenv=require('dotenv');
const User=require('./src/models/User.js');
const {getDB, mongoConnection}=require('./src/database/mongo.client.js')


app.use(express.json(`""`))
// setting up an endpoint


app.get('/',async(req,res)=>{
    const checkStatus=await mongoConnection.connect();
    const readyState = mongoConnection.topology.isConnected()
        ? 'connected'
        : 'disconnected';
    res.send({readyState})
})

app.post('/users',async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        const newUser=new User({username,email,password});
        await newUser.save();
        res.status(201).json({message:`User created successfully`});
    }catch(err){
        res.status(400)
           .json({message:err.message})
    }
})
// The port

const PORT=8080;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Virtual Assistant API is running on http://localhost:${PORT}`)
})

