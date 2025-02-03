import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AddressCard = () => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState(0);
    const [addressType, setAddressType] = useState("");
    const navigate=useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        const addressData = {
            city,
            country,
            address1,
            address2,
            zipCode,
            addressType,
        };

        console.log("Submitted Address:", addressData);

        const token=localStorage.getItem('token')
        if(!token){
            return alert('token missing')
        }

        const response=await axios.post(`http://localhost:8080/user/add-address?token=${token}`,addressData)
        navigate('/profile')

        // Clear the form fields after submission (optional)
        // setCity("");
        // setCountry("");
        // setAddress1("");
        // setAddress2("");
        // setZipCode("");
        // setAddressType("");
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Address Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input
                        type="text"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        placeholder="Enter Address Line 1"
                        required
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input
                        type="text"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        placeholder="Enter Address Line 2"
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter City"
                        required
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter Country"
                        required
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter Zip Code"
                        required
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Address Type</label>
                    <select
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        required
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Select Address Type
                        </option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddressCard;
