import React, {Component} from "react"
import axios from 'axios'
import "./signin.css"
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button } from "@material-ui/core";
import { Visibility, VisibilityOff, Cancel, VpnKey } from "@material-ui/icons";

class Signin extends Component{
    constructor(props){
        super(props);
        this.state = {
            prenom: "",
            nom: "",
            username: "",
            email: "",
            password: "",
            dateN: "",
            showPassword: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


handleChange(event){
    const {name, value, type} = event.target
    type === "date" ? this.setState({[name]: value})  : this.setState({
        [name]: value
    })
}

handleClickShowPassword = () => {
    this.setState({
        showPassword: !this.state.showPassword
    })
}

handleMouseDownPassword = (event) => {
    event.preventDefault()
}

creation = () => {
    this.props.home(); 
    alert("Compte cree")
}

handleSubmit(event){
    event.preventDefault();
    const formData = new URLSearchParams();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    formData.append('name', this.state.nom);
    formData.append('prenom', this.state.prenom);
    formData.append('mail', this.state.email);
    formData.append('dateNaissance', this.state.dateN);
    axios.post("http://localhost:8080/Projet/user", formData)
    .then(r => {r.data.code === undefined ? this.creation() :alert(r.data.code + ': ' + r.data.mess)})
    .catch(errorRep => {alert(errorRep)})
}

    render(){
        return <div className="sign">
            <div className="sign-body">
                <div className="sign-hd">
                    <h1 className="title wel-tit">Inscription</h1>
                </div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="sign-in">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">Nom</InputLabel>
                            <OutlinedInput id="component-outlined" value={this.state.nom} name="nom" onChange={this.handleChange} label="Nom" required/>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">Prenom</InputLabel>
                            <OutlinedInput id="component-outlined" value={this.state.prenom} name="prenom" onChange={this.handleChange} label="Prenom" required/>
                        </FormControl>
                    </div>
                    <div className="sign-in">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">id</InputLabel>
                            <OutlinedInput id="component-outlined" value={this.state.username} name="username" onChange={this.handleChange} label="id" required/>
                        </FormControl>
                    </div>
                    <div className="sign-in">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                name="password"
                                onChange={this.handleChange}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={75}
                                required
                            />
                        </FormControl>
                    </div>
                    <div className="sign-in">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Email address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                                startAdornment={<InputAdornment position="start">@</InputAdornment>}
                                labelWidth={105}
                                required
                            />
                        </FormControl>
                    </div>    
                    <div className="sign-in">
                        <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                name="dateN"
                                value={this.state.dateN}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                required
                            />
                    </div>
                    <div className="sign-in">
                             <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                startIcon={<VpnKey />}
                            >
                                Sign up
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.props.home}
                                startIcon={<Cancel />}
                            >
                                Cancel
                            </Button>
                    </div>
                </form>
            </div>
        </div>
    }
}

export default Signin