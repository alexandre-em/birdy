import React, {Component} from "react"
import axios from "axios"
import { ExitToApp, AccountCircle } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

class Logout extends Component{

    deconnexion = () => {
        axios.delete("http://localhost:8080/Projet/login?login="+this.props.acc)
        .then(r => {this.props.log(); alert("Deconnecte")})
        .catch(errorRep => {alert(errorRep)})
    }
    
    render(){
        return <div>
            <IconButton>
                <AccountCircle onClick={this.props.prof} fontSize="large"/>
            </IconButton>
            <IconButton>
                <ExitToApp onClick={this.deconnexion} fontSize="large"/>
            </IconButton>
        </div>
    }
}

export default Logout