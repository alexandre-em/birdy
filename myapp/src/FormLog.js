import React, {Component} from "react"
import axios from 'axios'
import { FormControl, InputLabel, OutlinedInput, Button } from "@material-ui/core";
import './login.css';
import { LockOpen, VpnKey } from "@material-ui/icons";

class FormLog extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    
    handleSubmit(event){
        event.preventDefault();
        const formData = new URLSearchParams();
        formData.append('login', this.state.username);
        formData.append('password', this.state.password);
        axios.post("http://localhost:8080/Projet/login", formData)
        .then(r => {r.data.code === undefined ? this.traitementReponse(r):alert(r.data.code + ': ' + r.data.mess)})
        .catch(errorRep => {alert(errorRep)})
    }

    traitementReponse = (props) => {
        if(props.data.key !== undefined){
            this.props.acc(this.state.username);
            this.props.log();
        } else {
            alert(props.data.mess)
        }
    }

    render(){
        return <div className="log">
            <div className="log-body">
                <div className="log-hd">
                    <h1 className="title wel-tit">User login</h1>
                </div>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="log-inp">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">id</InputLabel>
                            <OutlinedInput id="component-outlined" value={this.state.username} name="username" onChange={this.handleChange} label="Name" required/>
                        </FormControl>
                        </div>
                        <div className="log-inp">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">password</InputLabel>
                            <OutlinedInput id="outlined-password-input" value={this.state.password} autoComplete="current-password" type="password" name="password" onChange={this.handleChange} label="Password" required/>
                        </FormControl>
                        </div>
                        <div className="log-inp">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                startIcon={<LockOpen />}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.props.sign}
                                startIcon={<VpnKey />}
                            >
                                Sign up
                            </Button>
                        </div>
                    </form>
            </div>
        </div>
    }
}

export default FormLog