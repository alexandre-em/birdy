import React, {Component} from "react"
import ListeM from './ListeM'
import FormM from './FormM'
import ListA from './ListA'
import AddF from './AddF'
import axios from 'axios'

class Utilisateur extends Component{
    constructor(props){
        super(props);
        this.state={
            nom: "",
            prenom: "",
            username: this.props.acc,
            dateN: "",
            email: "",
            ami: false
        }
        this.switchAmi = this.switchAmi.bind(this)
        this.switchMsg = this.switchMsg.bind(this)
    }

    changeUser = (user) => {
        this.setState({
            username: user
        })
        this.infoUser()
    }

    infoUser = () => {
        axios.get("http://localhost:8080/Projet/user", {params:{
            username: this.state.username,
        }, data:{}})
        .then(response => {
            response.data.code ===undefined ? this.setState({
                nom: response.data.nom,
                prenom: response.data.prenom,
                username: response.data.username,
                dateN: response.data.dateN,
                email: response.data.email
            }) :alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
    }

    componentWillMount = () => {
        this.infoUser()
    }

    switchAmi(){
        this.setState({ami: true})
    }

    switchMsg(){
        this.setState({ami:false})
    }

    render(){
        return <div className="zentai">
            <div className="left">
                <div className="infos">
                    <h1 className="title">{this.state.prenom} {this.state.nom}</h1>
                    <h>@{this.state.username}</h>
                    <br />
                    Ne le {this.state.dateN}
                    <br />
                    Contact : {this.state.email}
                    <br />
                    <br />
                    <br />
                    {this.props.id !== this.state.username ? <AddF acc={this.props.acc} btn={this.switchAmi} idF={this.state.username} /> : 
                    <h className="bouton ami-btn" onClick={this.switchAmi}>Amis</h> }
                </div>
            </div>

            <main>
                {this.props.connecte === true ? <FormM username={this.props.acc}/>: "" }
                {this.state.ami === true ? <ListA acc={this.props.acc} prof={this.changeUser} retour={this.switchMsg}/>: <ListeM acc={this.props.acc} prof={this.changeUser}/> }
            </main>
        </div>
    }
}

export default Utilisateur