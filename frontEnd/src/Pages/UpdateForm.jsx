import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
// import { analysis } from "../../../backend/src/utilis/cloudinary";
// import { Upload } from "lucide-react";




function UpdateForm() {

    const { id } = useParams()

    // console.log(id)
    const [formdata, setformdata] = useState({
        title: '',
        description: '',
        discountedPrice: 0,
        originalPrice: 0,
        quantity: 0,
        category: '',
        rating: 0


    })

    const [error, setError] = useState('')
    const [imgs, setImgs] = useState(null)

    const handlefileUpload = (e) => {
        const ImageArray = Array.from(e.target.files)
        console.log(ImageArray)
        setImgs(ImageArray)

    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        console.log(formdata)
        // console.log(ImageArray)

        const { title, description, discountedPrice, originalPrice, quantity, category, rating } = formdata

        if (title.length <= 0 || description.length <= 0 || discountedPrice <= 0 || originalPrice <= 0 || quantity <= 0 || category.length <= 0) {
            return setError('Enter the information inside the fields...')
        }

        let formdataBody = new FormData();
        formdataBody.append('title', title)
        formdataBody.append('description', description)
        formdataBody.append('discountedPrice', discountedPrice)
        formdataBody.append('originalPrice', originalPrice)
        formdataBody.append('rating', rating)
        formdataBody.append('quantity', quantity)
        formdataBody.append('category', category);

        if (imgs) {
            imgs?.map((ele) => {
                formdataBody.append('files', ele);
            });
        } else {
            formdataBody.append('images', formdata.images);
        }

        console.log(formdataBody)


        let requestData = await axios.put(`http://localhost:8080/product/update-products/${id}`, formdataBody, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

            .then((res) => {
                console.log(res.data)
                return res;
            })
            .catch((err) => {
                console.log('Error', err)
                return err
            })


    }

    const handleChange = (e) => {
        setError('')
        const { name, value } = e.target
        console.log(name, value)

        setformdata({
            ...formdata,
            [name]: value

        })

        // console.log(setformdata)
        // for (let pair of formdata.entries()) {
        //     if (pair[1] instanceof File) {
        //         console.log(
        //             `${pair[0]}: File - ${pair[1].name}, ${pair[1].type}, ${pair[1].size} bytes`
        //         );
        //     } else {
        //         console.log(`${pair[0]}: ${pair[1]}`);
        //     }
        // }


    }


    useEffect(() => {
        const getDataForId = async () => {
            const singleData = await axios.get(`http://localhost:8080/product/get-single/${id}`)
            console.log(singleData)
            setformdata(singleData.data.data)
            setImgs(singleData.data.data.imgs)
        }
        getDataForId()

    }, [id])


    return (
        <div className="flex justify-center items-center border border-black h-screen">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Product title</label>
                    <br />
                    <input type="text" onChange={handleChange} value={formdata.title} name="title" placeholder="Enter product title" />
                </div>
                <div>
                    <label htmlFor="">Product description</label>
                    <br />
                    <input type="text" name="description" onChange={handleChange} value={formdata.description} placeholder="Enter description" />
                </div>

                <div>
                    <label htmlFor="">Discounted Price</label>
                    <br />
                    <input type="number" name="discountedPrice" onChange={handleChange} value={formdata.discountedPrice} placeholder="Discounted price" />
                </div>

                <div>
                    <label htmlFor="">Original Price</label>
                    <br />
                    <input type="number" name="originalPrice" onChange={handleChange} value={formdata.originalPrice} placeholder="Original Price" />
                </div>

                <div>
                    <label htmlFor="">Stock Quantity</label>
                    <br />
                    <input type="number" name="stockQuantity" onChange={handleChange} value={formdata.quantity} placeholder="enter stock quantity" />
                </div>

                <div>
                    <label htmlFor="">Upload product image</label>
                    <br />
                    <input type="file" multiple onChange={handlefileUpload} />
                </div>

                <div>
                    <label htmlFor="">Enter category</label>
                    <br />
                    <input type="text" name="category" onChange={handleChange} value={formdata.category} placeholder="enter the category" />
                </div>

                <div>
                    <label htmlFor="">rating of the product</label>
                    <br />
                    <input type="number" name="rating" onChange={handleChange} value={formdata.rating} placeholder="rating of the product" />
                </div>

                {error && <p>{error}</p>}
                <button type="Submit" className="bg-blue-400 text-white px-5 py-1">Submit</button>
            </form>
        </div>
    )

}


export default UpdateForm;

