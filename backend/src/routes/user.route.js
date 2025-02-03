const express = require('express');
// const  model = require('mongoose');
const {CreateUser , verifyUserController,signup,login,getUserData,AddAddressController,getAddressController} = require('../controller/user.controller.js')
const upload = require('../middlewares/multer.js')
const jwt=require('jsonwebtoken')
const router = express.Router();
const verifyUser=require('../middlewares/jwt-verify.js')

const productrouter=require('./product.route.js')

router.post('/create-user', upload.single('file'), CreateUser)
router.get('/activation/:token',verifyUserController)

router.post("/signup",upload.single('file'),signup)
router.post("/login",login)

router.get('/user-data',verifyUser,getUserData)
router.post('/add-address',verifyUser,AddAddressController)

router.get('/get-addresses',verifyUser,getAddressController)

module.exports = router;

