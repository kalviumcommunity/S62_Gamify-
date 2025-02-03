const nodemailer=require('nodemailer')

//nodemailer is only for js

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    auth:{
        user: 'claudiajerome9a@gmail.com',
        pass: 'xqia niem fvpl emsk',
    }
})

module.exports=transporter