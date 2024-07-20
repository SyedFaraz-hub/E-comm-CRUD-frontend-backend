import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const collectData = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        console.log(result);

        if (result.token) {
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.token))
            navigate('/')
        }
        else {
            alert("Please enter correct credencials")
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem('user')

        if (auth) {
            navigate('/')
        }
    })



    return (
        <div className='signup-box'>
            <h1>Login</h1>
            <input className='inputBox' value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Enter Email' />
            <input className='inputBox' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Enter Password' />
            <button className='appButton' onClick={collectData} type='button'>Log in</button>
        </div>
    )
}

export default Login