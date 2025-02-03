import { useEffect, useState } from "react";
import Card from '../components/ProductCard/Card';
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
    const [data, setdata] = useState([])
    const fetchProduct = async () => {
        const response = await axios.get(
            'http://localhost:8080/product/get-products'
        )
        setdata(response.data.data)
        // console.log(response)
    }

    useEffect(() => {
        console.log('clicked');
        const callhandler = async () => {
            await fetchProduct()
        }
        callhandler()
    }, [])

    // console.log(data)
    const handleDelete = async (id) => {
        console.log('id', id);
        const data = await axios.delete(`http://localhost:8080/product/${id}`);
        setdata(data.data.data);
    };


    return (
        <>
            <h1 className="text-center">'Welcome to Home Page for Follow along!'</h1>
            <div className="grid grid-cols-3">
                {data?.map((ele, index) => {
                    return (
                        <div key={index} style={{ margin: 'auto' }}>
                        {/* <Link to={`/product-details/${ele._id}`}> */}
                            <Card title={ele.title}
                                image={ele.Imgs[0] ? ele.Imgs[0] : 'Product Image missing'}
                                index={index}
                                description={ele.description}
                                stockPrice={ele.stockPrice}
                                originalPrice={ele.originalPrice}
                                discountedPrice={ele.discountedPrice}
                                rating={ele.rating}
                                id={ele._id}
                                handleDelete={handleDelete}
                            />
                        {/* </Link> */}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default HomePage;