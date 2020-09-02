import React, {Component} from "react"
import axios from "axios"

class Ami extends Component{
    constructor(){
        super()
        this.state={
            prenom: "",
            nom: "",
            id: ""
        }
    }

    componentWillMount= () => {
        axios.get("http://localhost:8080/Projet/user", {params:{
            username: this.props.ami,
        }, data:{}})
        .then(response => {
            this.setState({
                prenom: response.data.prenom,
                nom: response.data.nom,
                id: response.data.username
            })
        })
        .catch(errorRep => {alert(errorRep)})
    }

    render(){
        return <div>
            <div className="ami">
                <div className="name">
                    <p> {this.state.prenom} <b>{this.state.nom}</b></p>
                    <button onClick={() => this.props.prof(this.state.id)}>{this.state.id}</button>
                </div>
            </div>
        </div>
    }
}

export default Ami