import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductlList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])


    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json()
        setProducts(result)
    }

    const handleDelete = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json()
        if (result) {
            getProducts()
        }
        else {
            alert("Unable to delete the product")
        }
    }

    const handleSearch = async (e) => {
        let key = e.target.value

        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts()
        }
    }


    return (
        <div className='product-list-container'>
            <h1>Products</h1>

            <input type='text' onChange={handleSearch} placeholder='Search products' className='search-product' />

            <div className='product-table'>
                <ul>
                    <li>S.No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Operation</li>
                </ul>

                {products.length > 0 ?
                    products?.map((item, index) => {
                        return (
                            <ul key={index}>
                                <li>{index + 1}</li>
                                <li>{item.name}</li>
                                <li>{item.price}</li>
                                <li>{item.category}</li>
                                <li>
                                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                                    <Link to={`/update/${item._id}`} >Update</Link>
                                </li>
                            </ul>

                        )
                    })
                    : <h1 className='align-center'>No Products Found</h1>

                }

            </div>
        </div>
    )
}

export default ProductlList