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
        axios.delete("https://birdy-em.herokuapp.com/login?login="+this.props.acc)
        .then(r => this.disconnect())
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