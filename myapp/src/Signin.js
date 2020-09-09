import React, {Component} from "react"
import axios from 'axios'

class Signin extends Component{
    constructor(props){
        super(props);
        this.state = {
            prenom: "",
            nom: "",
            username: "",
            email: "",
            password: "",
            dateN: ""
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
        return <div className="enregistrement_main">
            <h1>Inscription</h1>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                Prenom : <input 
                    type="text"
                    value={this.state.prenom}
                    name="prenom"
                    placeholder="prenom"
                    className="inputSub"
                    onChange={this.handleChange} required/>
                <br />
                Nom <input 
                    type="text"
                    value={this.state.nom}
                    name="nom"
                    placeholder="nom"
                    className="inputSub"
                    onChange={this.handleChange} required/>
                    <br />
                Id <input 
                    type="text"
                    value={this.state.username}
                    name="username"
                    placeholder="username"
                    className="inputSub"
                    onChange={this.handleChange} required/>
                    <br />
                E-Mail <input 
                    type="text"
                    value={this.state.email}
                    name="email"
                    placeholder="email"
                    className="inputSub"
                    onChange={this.handleChange} required/>
                    <br />
                Date de naissance <input 
                    type="date"
                    value={this.state.dateN}
                    name="dateN"
                    placeholder="dateN"
                    className="inputSub"
                    onChange={this.handleChange} required/>
                    <br />
                Mot de Passe <input 
                    type="password"
                    value={this.state.password}
                    name="password"
                    placeholder="password"
                    className="inputSub"
                    onChange={this.handleChange} required/>
                    <br />
                    <input type="submit" value ="S'enregistrer" />
                    <button onClick={this.props.home}>Cancel</button>
            </form>
        </div>
    }
}

export default Signin