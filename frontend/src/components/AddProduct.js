import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const AddProduct = () => {
    const navigate = useNavigate()


    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')

    const collectData = async () => {
        if (!name || !price || !category) {
            alert("Please enter all fields")
            return false
        }



        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch('http://localhost:5000/add-product', {
            method: "POST",
            body: JSON.stringify({ name, price, category, userId }),
            headers: {
                'Content-Type': 'application/json',
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })

        result = await result.json()

        if (result) {
            navigate("/")
        }
    }

    return (
        <div className='signup-box'>
            <h1>Add Product</h1>
            <input className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Enter Name' />
            <input className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} type='text' placeholder='Enter Price' />
            <input className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} type='text' placeholder='Enter Category' />
            <button className='appButton' onClick={collectData} type='button'>Add Product</button>
        </div>
    )
}

export default AddProduct