const mongoose = require('mongoose')
const { schema } = require('./productModel')

const schemaObj = {
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }

}

const cartSchema = new mongoose.Schema(schemaObj, { versionKey: false })
const cartModel = mongoose.model('Cart', cartSchema)
module.exports = cartModel