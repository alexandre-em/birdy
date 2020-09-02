import React, {Component} from "react"
import axios from "axios"

class Logout extends Component{

    deconnexion = () => {
        axios.delete("http://localhost:8080/Projet/login?login="+this.props.acc)
        .then(r => {this.props.log(); alert("Deconnecte")})
        .catch(errorRep => {alert(errorRep)})
    }
    
    render(){
        return <div>
            <h className="bouton nav-bouton" onClick={this.props.prof}>Profil</h>
            <h className="bouton nav-bouton" onClick={this.deconnexion}>Logout</h>
        </div>
    }
}

export default Logout