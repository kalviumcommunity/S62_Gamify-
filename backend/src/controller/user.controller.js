const ErrorHandler = require('../utilis/ErrorHandler.js')
const usermodel = require('../model/user_model.js')
const transporter = require('../utilis/sendMail.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { url } = require('../utilis/cloudinary.js')
const cloudinary = require('../utilis/cloudinary.js')
const fs = require('fs')
require('dotenv').config({
    path: '..config/.env'
})
const mongoose = require('mongoose')

async function CreateUser(req, res) {
    const { Name, email, password } = req.body;

    const checkUserpresent = await usermodel.findOne({
        email: email, //user schema
    });

    if (checkUserpresent) {
        const error = new ErrorHandler('Already Present in DB', 400)

        return res.status(404).send({
            message: error.message,
            status: error.statuscode,
            success: false,
        })

    }

    const newUser = new usermodel({
        Name: Name,
        email: email,
        password: password,
    })

    const data = {
        Name,
        email,
        password,
    }

    //1. we have to send mail to user for verification as http://localhost:5173/activation/{token}
    //2. we have to send the mail as link to user
    //3. when the user click the link user have to be directed to activation page
    const token = generateToken(data)
    await transporter.sendMail({
        to: 'claudiajerome07@gmail.com',
        from: 'claudiajerome9a@gmail.com',
        subject: 'verification email for signup',
        text: 'Text',
        html: `<h1>E-commerce http://localhost:5173/activation/${token}</h1>`
    })

    await newUser.save();
    return res.send('user Created Successfully')

}

const generateToken = (data) => {
    const token = jwt.sign({ name: data.name, email: data.email, id: data.id }, process.env.SECRET_KEY)
    return token
}


async function verifyUserController(req, res) {
    const { token } = req.params
    try {
        if (verifyUser(token)) {
            return res.status(200).cookie('token', token).json({ token, success: true })

        }
        return res.status(403).send({ message: 'token expired' })

    } catch (err) {
        return res.status(403).send({ message: err.message })
    }
}
const verifyUser = (token) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (verify) {
        return verify;
    } else {
        return false
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)
    try {
        const checkUserPresentDB = await usermodel.findOne({ email: email });
        if (checkUserPresentDB) {
            return res.status(403).send({ message: "User Already Present" })
        }

        const ImageAddress = await cloudinary.uploader
            .upload(req.file.path, {
                folder: 'uploads',
            })
            .then((result) => {
                fs.unlinkSync(req.file.path);
                return result.url;
            });

        console.log('url', ImageAddress);

        bcrypt.hash(password, 10, async function (err, hashed) {
            try {
                if (err) {
                    return res.status(403).send({ message: err.message })
                }
                await usermodel.create({
                    Name: name,
                    email,
                    password: hashed,
                    avatr: {
                        url: ImageAddress,
                        public_id: `${email}_public_id`,
                    }
                })

                return res.status(201).send({ message: 'User created Successfully!' })
            }
            catch (er) {
                return res.status(500).send({ message: er.message })
            }
        })


    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const checkUserPresentDB = await usermodel.findOne({ email: email })
        bcrypt.compare(password, checkUserPresentDB.password, function (err, result) {
            if (err) {
                return res.status(403).send({ message: err.message, success: false })
            }
            let data = {
                id: checkUserPresentDB._id,
                email,
                password: checkUserPresentDB.password
            }
            const token = generateToken(data)
            return res.status(200).cookie('token', token).send({ message: "User logged in Successfully!", success: true, token })
        })

    } catch (err) {
        return res.status(403).send({ message: err.message, success: false })
    }
}

const getUserData = async (req, res) => {
    const userId = req.UserId;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).send({ message: "Send Valid User Id", success: false })
        }

        const checkUserPresentinDB = await usermodel.findById({ _id: userId });
        if (!checkUserPresentinDB) {
            return res.status(401).send({ message: "Please Signup, user not present" })
        }

        return res.status(200).send({ data: checkUserPresentinDB })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }


}

const AddAddressController = async (req, res) => {
    const userId = req.UserId;
    const { city, country, address1, address2, zipCode, addressType } = req.body

    try {
        const userFindOne = await usermodel.findOne({ _id: userId });

        if (!userFindOne) {
            return res.status(404).send({ message: "user not found", success: false })
        }

        const userAddress = {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType
        }

        userFindOne.address.push(userAddress)
        const response = await userFindOne.save()
        return res.status(201).send({ message: "user address added", success: true, response })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const getAddressController = async (req, res) => {
    const userId = req.UserId
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).send({ message: "Please login, Un-authorised", success: false })
        }

        const checkUser = await usermodel.findOne({ _id: userId }, { address: 1 })

        if (!checkUser) {
            return res.status(401).send({ message: "Please singup, user not present", success: false })
        }

        return res.status(200).send({
            userInfo: checkUser,
            message: 'Success',
            success: true
        })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

module.exports = { CreateUser, verifyUserController, signup, login, verifyUser, getUserData, AddAddressController, getAddressController }


//find gives list of object
//fincOne gives one object



