import React, {Component} from "react"
import axios from 'axios'

class AddF extends Component {
    state = {  }

    handleClick= (event) => {
        const formData = new URLSearchParams();
        formData.append('id', this.props.acc);
        formData.append('ami', this.props.id);
        axios.post("http://localhost:8080/Projet/friends", formData)
        .then(r => {alert("Friend added!")})
        .catch(errorRep => {alert(errorRep)})
    }

    render() { 
        return <div>
            <h className="bouton ami-btn" onClick={this.props.btn}>Amis</h>
            <h className="bouton ami-btn" onClick={this.handleClick}>Ajouter</h>
        </div>;
    }
}
 
export default AddF;