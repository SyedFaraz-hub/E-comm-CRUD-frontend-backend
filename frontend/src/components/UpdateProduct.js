import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const UpdateProduct = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')


    useEffect(() => {
        getProductDetails()
    }, [])



    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json()

        if (result) {
            const { name, price, category } = result
            setName(name)
            setPrice(price)
            setCategory(category)
        }

    }


    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category }),
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
            <h1>Update Product</h1>
            <input className='inputBox' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter Name' />
            <input className='inputBox' value={price} onChange={(e) => setPrice(e.target.value)} type='text' placeholder='Enter Price' />
            <input className='inputBox' value={category} onChange={(e) => setCategory(e.target.value)} type='text' placeholder='Enter Category' />
            <button className='appButton' onClick={updateProduct} type='button'>Update Product</button>
        </div>
    )
}

export default UpdateProduct