import { Avatar, IconButton, TextField } from '@material-ui/core'
import { AccountCircle, AlternateEmail, Cake, Info, Lock, Publish } from '@material-ui/icons'
import { storage } from './firebase'
import React, { useState } from 'react'
import './css/Signup.css'
import axios from './axios'

function Signup({ setId, setLoad, theme}) {
    const logoB = "https://img.icons8.com/ios-filled/100/000000/crow.png"
    const [userName, setUserName] = useState("")
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [dateN, setDateN] = useState("")
    const [image, setImage] = useState(null)

    const [send, setSend] = useState(true)

    const alertCreated = () => {
        setId("")
        alert("Account created")
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`avatars/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                if (snapshot.bytesTransferred === snapshot.totalBytes)
                    setSend(false)
            },
            (error) => { console.log(error) },
            () => {
                // push to the db, the link of image
                storage
                    .ref("avatars")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        signup(url)
                    })
            }
        )
        console.log("uploaded")
    }

    const signup = async (url) => {
        const formData = new URLSearchParams()
        formData.append('username', userName)
        formData.append('password', password)
        formData.append('name', nom)
        formData.append('prenom', prenom)
        formData.append('mail',email)
        formData.append('dateNaissance', dateN.replace(/-/g,'/'))
        formData.append('imgUrl', url)
        await axios.post('/user', formData)
        .then(res => {res.data.code === undefined? alertCreated():alert(res.data.code = ': ' + res.data.mess)})
    }

    return (
        <div className={`signup ${theme?"":"dark"}`}>
            <div className="signup__header">
                <img src={logoB} alt="" />
                <h1>Create an account</h1>
                {password!==password2? <b>Password doesn't match</b>:""}
                {!send? <b>Creating the account...</b>:""}
            </div>
            <div className="signup__body">
                <form>
                    <div className="signup__elt out">
                            <AccountCircle />
                            <TextField
                                id="standard-input"
                                label="Bird ID"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                required
                                />
                        </div>
                    <div className="signup__body-info">
                        <div className="signup__elt">
                            <Info />
                            <TextField
                                id="standard-input"
                                label="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                type="text"
                                required
                                />
                        </div>
                        <div className="signup__elt">
                            <Info />
                            <TextField
                                id="standard-input"
                                label="Prenom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                type="text"
                                required
                                />
                        </div>
                        <div className="signup__elt">
                            <Lock />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={ e => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                />
                        </div>
                        <div className="signup__elt">
                            <Lock />
                            <TextField
                                id="standard-password-input"
                                label="Confirm"
                                type="password"
                                value={password2}
                                onChange={ e => setPassword2(e.target.value)}
                                autoComplete="current-password"
                                required
                                />
                        </div>                        
                    </div>
                    <div className="signup__elt out">
                            <AlternateEmail />
                            <TextField
                                id="standard-input"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                required
                                />
                        </div>
                        <div className="signup__elt out">
                            <Cake />
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                value={dateN}
                                onChange={(e) => setDateN(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </div>

                </form>
                <div className="signup__body-img">
                    <Avatar />
                    <div className="signup__body-img-dtl">
                        <form>
                            <label htmlFor="upload-photo">
                                <input type="file"
                                    id="upload-photo"
                                    name="upload-photo"
                                    accept="image/*"
                                    onChange={handleChange}
                                    style={{display:"none"}}/>
                                <IconButton component="span">
                                    <Publish />
                                </IconButton>
                                <span style={{color: "#b4b4b4", fontSize: "10pt"}}><b>{image?image.name:"No image selected"}</b></span>
                            </label>
                        </form>
                    </div>
                </div>
                {(password!==password2 || password==="")? <span className="btn-submit disable"> <b>Submit</b> </span>:<span className="btn-submit" onClick={handleUpload}> <b>Submit</b> </span>}
                <span className="btn-submit cancel" onClick={() => setId("")}> <b>Cancel</b></span>
            </div>
        </div>
    )
}

export default Signup
