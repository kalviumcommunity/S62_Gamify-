import axios from "axios"
import { useEffect, useState } from "react"
import CartCard from "../components/ProductCard/CartCard"
import { Link } from "react-router-dom"

function CartPage() {
    const [UsersCartData, setUsersCartdata] = useState([])
    useEffect(() => {
        const getCartData = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                return alert('token is missing, please Login')
            }
            const response = await axios.get(`http://localhost:8080/cart/get-user-cart-data?token=${token}`)
            console.log(response)
            setUsersCartdata(response.data.cartData)
        }
        getCartData()
    }, [])
    return (
        <div>
            <Link to={`/select-address`}>
                <button className="bg-slate-800 color-white px-5 py-2 rounded-md ml-40">Checkout</button>
            </Link>
            {UsersCartData?.map((singleCartObject, index) => {
                return (
                    <div key={index}>
                        <CartCard
                            title={singleCartObject?.productId?.title}
                            images={singleCartObject?.productId?.Imgs[0]}
                            // index={index}
                            description={singleCartObject?.productId?.description}
                            stockPrice={singleCartObject?.productId?.stockPrice}
                            originalPrice={singleCartObject?.productId?.originalPrice}
                            discountedPrice={singleCartObject?.productId?.discountedPrice}
                            rating={singleCartObject?.productId?.rating}
                            id={singleCartObject?._id}
                            createdBy={singleCartObject?.userId}

                        />
                    </div>
                )
            })}


        </div>
    )

}

export default CartPage