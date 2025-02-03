import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddressList from '../components/AllAddress/Addresses';

function SelectAddressPage() {

    const [AllAddresses, SetAllAddresses] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Plaese login, token is missing')
            }

            const response = await axios.get(`http://localhost:8080/user/get-addresses?token=${token}`)
            console.log(response.data.userInfo)
            SetAllAddresses(response.data.userInfo.address)
        }
        fetch()
    }, [])
    return (
        <div>
            <AddressList addresses={AllAddresses} />
        </div>
    )
}

export default SelectAddressPage