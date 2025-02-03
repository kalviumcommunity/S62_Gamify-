const mongoose = require('mongoose')

const SchemeObj = {

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: String,
        required: true,
        enum: ['male', 'female', 'kids']
    },
    Imgs: [{
        type: String,
        require: true,
        default: 'https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }],
    userEmail: { type: String }

}

const productSchema = new mongoose.Schema(SchemeObj, { versionKey: false })
const productModel = mongoose.model('Product', productSchema)

module.exports = productModel