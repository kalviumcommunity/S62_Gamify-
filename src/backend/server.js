const express=require('express');
const app=express();

// setting up an endpoint

app.get('/',(req,res)=>{
    return res.send('<h1>The server is running</h1>')
})

// The port

const PORT=8080;
app.listen(PORT,()=>{
    console.log(`Virtual Assistant API is running on http://localhost:${PORT}`)
})

