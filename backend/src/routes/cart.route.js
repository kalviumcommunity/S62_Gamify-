const express = require('express')
const router=express.Router()
const verifyUser=require('../middlewares/jwt-verify.js')
const {AddToCartController,GetProductForUser}=require('../controller/cart.controller.js')

router.post('/add-to-cart',verifyUser,AddToCartController)

router.get('/get-user-cart-data',verifyUser,GetProductForUser)

module.exports=router;

