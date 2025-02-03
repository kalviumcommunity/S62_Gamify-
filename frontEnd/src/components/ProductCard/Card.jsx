import { Link } from "react-router-dom";
import axios from "axios";
// import { Link, NavLink } from "react-router-dom";


function Card({ title, index, image, originalPrice, discountedPrice, description, rating, id, handleDelete }) {

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')
    console.log(token)
    try {
      if (!token) {
        return alert("Please Login")
      }
      const response = await axios.post(`http://localhost:8080/cart/add-to-cart?token=${token}`, { productId: id, quantity: 1 })
      console.log('Product added to cart')
    }
    catch (error) {
      alert(error.response.message);
      console.log(error.message)
    }
  }

  return (
    <div className="w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative">
        <Link to={`/product-details/${id}`}>
          <img
            src={image}
            alt="Product"
            className="w-full h-48 object-cover"
          />
        </Link>
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {rating}
        </span>
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title} - {index + 1}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="ml-2 text-sm text-gray-600">{rating}</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">{discountedPrice}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              {originalPrice}
            </span>
          </div>
          <button onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
            Add to Cart
          </button>
          <Link to={`/update-products/${id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
              Update
            </button>
          </Link>


          <button onClick={() => handleDelete(id)} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">

            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card