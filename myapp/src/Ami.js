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
        axios.get("https://birdy-em.herokuapp.com/user", {params:{
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
                    <p className="btn-usr" onClick={() => this.props.prof(this.state.id)}>@{this.state.id}</p>
                </div>
            </div>
        </div>
    }
}

export default Ami