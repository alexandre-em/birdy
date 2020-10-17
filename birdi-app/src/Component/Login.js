import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './css/Login.css'
import axios from './axios'

function Login({ setId, setLoad, theme }) {
    const logoB = "https://img.icons8.com/ios-filled/100/000000/crow.png"
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const connection = async (e) => {
        const formData = new URLSearchParams();
        formData.append('login', userName)
        formData.append('password', password)
        await axios.post('/login', formData)
        .then (res => {res.data.code === undefined? setId(res.data.id):
            (res.data.code === '01'? setId(userName):
            setError(true))})
            .catch(err => console.log(err))
            setLoad('')
        }
        
    const handleClick= (e) => {
        e.preventDefault()    
        setLoad('load')
        connection()
    }

    return (
        <div className={`login ${theme?"":"dark"}`}>
            <img src={logoB} alt="" />
            <h1>Login to Birdy</h1>
            <h4>Demo log/pass: "demo"</h4>
            <TextField
                id="standard-input"
                label="Bird ID"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                />
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                value={password}
                onChange={ e => setPassword(e.target.value)}
                onKeyDown={ e => {if (e.key === 'Enter') {
                    handleClick(e)}}}
                autoComplete="current-password"
                />
            {error?<b>Username and/or Password are incorrect</b>:""}
            <div className="log__bouton">
                <span onClick={handleClick}>Login</span>
                <span onClick={() => setId('new')}>Sign up</span>
            </div>
        </div>
    )
}

export default Login
