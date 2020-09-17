import React, {Component} from "react"
import axios from "axios"
import { ExitToApp } from "@material-ui/icons"
import { Avatar, IconButton } from "@material-ui/core"

class Logout extends Component{

    disconnect = () => {
        this.props.log(); 
        alert("Deconnecte")
    }

    deconnexion = () => {
        axios.delete("http://localhost:8080/Projet/login?login="+this.props.acc)
        .then(r => {r.data.code === undefined ? this.disconnect() : alert(r.data.code + ': ' + r.data.mess)})
        .catch(errorRep => {alert(errorRep)})
    }
    
    render(){
        return <div>
            <IconButton onClick={this.props.prof}>
                <Avatar style={{backgroundColor: "rgb(129, 55, 55)"}}>{this.props.acc.charAt(0).toUpperCase()}</ Avatar>
            </IconButton>
            <IconButton onClick={this.deconnexion}>
                <ExitToApp fontSize="large"/>
            </IconButton>
        </div>
    }
}

export default Logout