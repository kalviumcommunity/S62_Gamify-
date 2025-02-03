const mongoose = require('mongoose');
const { use } = require('../app');

// schema is object and model is a blueprint for that.

const userSchema = new mongoose.Schema({
    Name: { type: String, require: [true, 'plaese enter the name!'] },
    email: {
        type: String,
        required: [true, 'Please eneter email!'],
        unique: [true, 'please enter unique Email id']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password!']
    },
    
    address: [
        {
            country: {
                type: String,
            },
            city: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            zipCode: {
                type: Number,
            },
            addressType: {
                type: String,
            },
        },
    ],
    role: {
        type: String,
        default: 'user'
    },
    Avatar: {
        URL: { type: String, require: true },
        public_ID: { type: String, require: true },

    },
    resetPasswordToken: String,
    resetPasswordTime: Date,

}, { versionkey: false });

const usermodel = mongoose.model('User', userSchema)

module.exports=usermodel;
