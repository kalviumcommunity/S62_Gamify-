if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: './src/config/.env',
    });
}

const express=require('express');
const cors=require('cors')
const cookieParser=require('cookie-parser')


const app=express();
const userRouter=require('./routes/user.route.js')
const productRouter=require('./routes/product.route.js')
const cartRouter=require('./routes/cart.route.js')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/',(req,res)=>{
    return res.send('heyy there!')
})

// app.use('/user')

app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
//connecting db and running server 
module.exports=app;