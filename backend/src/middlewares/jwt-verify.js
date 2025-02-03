const jwt=require('jsonwebtoken')
const { patch } = require('../app')
const { query } = require('express')

if(process.env.NODE!=='PRODUCTION'){
    require('dotenv').config({
        path: './config/.env',
    })
    
}

const verifyUser=(req,res,next)=>{
    const {token}=req.query
    // console.log(token)
    if(!token){
        return res.status(404).send({message:'Send Token over request'})
    }

    const data=jwt.verify(token,process.env.SECRET_KEY)
    req.userEmailAddress=data.email;
    console.log()
    req.UserId=data.id
    next();
}

module.exports=verifyUser;