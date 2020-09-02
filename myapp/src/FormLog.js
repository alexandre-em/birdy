import React, {Component} from "react"
import axios from 'axios'

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
        .then(r => {this.traitementReponse(r)})
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
        return <div className="login">
            <h1>Connexion</h1>
            <h2>Bonjour {this.state.username}</h2>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                Id <input 
                    type="text"
                    value={this.state.username}
                    name="username"
                    placeholder="username"
                    className="inputLog"
                    onChange={this.handleChange} required/>
                    <br />
                Mot de Passe <input 
                    type="password"
                    value={this.state.password}
                    name="password"
                    placeholder="password"
                    className="inputLog"
                    onChange={this.handleChange} required/>
                    <br />
                    <input type="submit" value="Log in"/>
                    <button onClick={this.props.sign}>s'inscrire</button>
            </form>
        </div>
    }
}

export default FormLog