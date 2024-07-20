import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const collectData = async () => {
       let result = await fetch('http://localhost:5000/register', {
        method: "POST",
        body: JSON.stringify({name, email, password}),
        headers: {
            'Content-Type': 'application/json'
        }})

        result = await result.json()
        console.log(result);

        if(result.token) {
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.token))
            navigate('/')
        }
    }

    useEffect(()=> {
        const auth = localStorage.getItem('user')
         
        if (auth) {
            navigate('/') 
        }
    })


    return (
        <div className='signup-box'>
            <h1>Register</h1>
            <input className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Enter Name' />
            <input className='inputBox' value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Enter Email' />
            <input className='inputBox' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Enter Password' />
            <button className='appButton' onClick={collectData} type='button'>Sign up</button>
        </div>
    )
}

export default SignUp