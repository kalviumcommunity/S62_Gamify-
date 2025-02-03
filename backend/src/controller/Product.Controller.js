const fs = require('fs') //file system
const cloudinary = require('../utilis/cloudinary.js')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
const ProductModel = require('../model/productModel.js');
const { verify } = require('crypto');
// const productModel = require('../model/productModel.js');


const createProductController = async (req, res) => {
    const { title,
        description,
        discountedPrice,
        originalPrice,
        quantity,
        category,
        rating } = req.body
    try {
        const ImgArray = req.files.map(async (singleFile, index) => {
            return cloudinary.uploader.upload(singleFile.path, {
                folder: 'uploads'
            })
                .then((result) => {
                    fs.unlinkSync(singleFile.path);
                    return result.url;
                })
        })

        const dataImgs = await Promise.all(ImgArray)
        const StoreproductDetails = await ProductModel.create({
            title,
            description,
             discountedPrice,
            originalPrice,
            quantity,
            category,
            rating,
            Imgs: dataImgs,
            userEmail:req.useEmailAddress
        })

        return res.status(201).send({
            message: 'Image Successfully uploaded',
            success: true,
            dataImgs,
            StoreproductDetails,
        })
    } catch (error) {

        if (error instanceof multer.MulterError) {
            return res.status(400).send({
                message: 'Multer error please send image less than 5',
                success: false
            })
        }
        res.status(500).send({ message: error, success: false })
    }
}

const getProductDataController = async (req, res) => {
    try {
        const data = await ProductModel.find()
        return res.status(200).send({ data, message: 'Data fetched Successfully', success: true })
    } catch (err) {
        return res.status(500).send({ message: err, success: false })
    }

}

const updateProductController = async (req, res) => {
    const {
        title,
        description,
        rating,
        discountedPrice,
        originalPrice,
        quantity,
        category,
    } = req.body;
    const { id } = req.params;

    try {
        const checkIfProductExists = await ProductModel.findOne({ _id: id });
        // {
        //   name:"xyz"
        // } truthy

        // {}  falsy
        if (!checkIfProductExists) {
            return res.status(404).send({ message: 'Product Not Found' });
        }

        const arrayImage =
            req.files &&
            req.files.map(async (singleFile, index) => {
                return cloudinary.uploader
                    .upload(singleFile.path, {
                        folder: 'uploads',
                    })
                    .then((result) => {
                        fs.unlinkSync(singleFile.path);
                        return result.url;
                    });
            });
        const Imagedata = req.files && (await Promise.all(arrayImage));
        const UpdatedImages = req.files ? Imagedata : req.body.images;
        const findAndUpdate = await ProductModel.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                rating,
                discountedPrice,
                originalPrice,
                quantity,
                category,
                images: UpdatedImages,
            },
            {
                new: true,
            }
        );

        console.log(findAndUpdate)
        return res.status(201).send({
            message: 'Document Updated Successfully',
            success: true,
            UpdatedResult: findAndUpdate,
        });
    } catch (er) {
        console.log(er.message);
        return res.status(500).send({ message: er.message, success: false });
    }
};




const getSingleProductDocumentController = async (req, res) => {
    const { id } = req.params

    try {
        const data = await ProductModel.findOne({ _id: id })

        if (!data) {
            return res.status(404).send({ message: 'Product not found' })
        }
        return res.status(200).send({ message: "Product Fetched Successfully", data, success: true })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


const deleteSingleProductController = async (req, res) => {
    const { id } = req.params

    try {
        const data = await ProductModel.findOne({ _id: id })

        if (!data) {
            return res.status(404).send({ message: 'Product not found' })
        }

        await ProductModel.findByIdAndDelete({ _id: id })
        const newData = await ProductModel.find()
        return res.status(200).send({ message: "Product Fetched Successfully", newDatadata, success: true })
    } catch (err) {
        return res.status(500).send({ message: err.message, success: false })
    }
}


module.exports = { createProductController, getProductDataController, updateProductController, getSingleProductDocumentController, deleteSingleProductController }



