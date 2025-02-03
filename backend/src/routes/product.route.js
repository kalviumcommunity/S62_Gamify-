const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'temp-uploads/' })
const router = express.Router()

const { createProductController, getProductDataController,updateProductController,getSingleProductDocumentController,deleteSingleProductController } = require('../controller/Product.Controller.js')
const verifyUser=require('../middlewares/jwt-verify.js')


router.post('/create-product', upload.array('files', 5), verifyUser,createProductController)

router.get('/get-products', getProductDataController);

router.put('/update-products/:id', upload.array('files', 5), updateProductController)


router.get('/get-single/:id', getSingleProductDocumentController)

router.delete('/:id', deleteSingleProductController)

module.exports = router;

