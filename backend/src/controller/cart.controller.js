const mongoose = require('mongoose');
const cartModel = require('../model/cart.model.js');
const usermodel = require('../model/user_model.js');

async function AddToCartController(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.UserId;
    // console.log(userId)
    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ message: 'Send valid Product Id', success: false })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Send valid User Id', success: false })
        }

        const checkUserpresent = await usermodel.findOne({ _id: userId })
        if (!checkUserpresent) {
            return res.status(401).send({ message: 'Unathuroised Please signup', success: false })
        }

        const checkIfProductPresent = await cartModel.findOne({ productId: productId, userId })
        if (checkIfProductPresent) {
            return res.status(400).send({ message: 'Product Already present in cart', success: false })
        }
        await cartModel.create({
            productId,
            quantity,
            userId
        })

        return res.status(201).send({ message: 'Product successfully added to cart' })
    } catch (err) {
        return res.status(500).send({ message: err.message, success: false })
    }
}

async function GetProductForUser(req, res) {
    const userId = req.UserId;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).send({ message: 'Unauthorised Please Signup', success: false })
        }
        const checkUserpresent = await usermodel.findOne({ _id: userId })
        if (!checkUserpresent) {
            return res.status(401).send({ message: 'Unathuroised Please signup', success: false })
        }
        console.log(userId)

        const data = await cartModel.find({ userId: checkUserpresent._id }).populate('productId')
        console.log(data)
        return res.status(200).send({
            message: "Data is successfully fetched",
            success: true,
            cartData: data
        })
    } catch (err) {
        return res.status(500).send({ message: err.message, success: false })
    }


}

module.exports = { AddToCartController, GetProductForUser }