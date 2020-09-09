import React, {Component} from "react"
import axios from 'axios'

class AddF extends Component {
    state = {  }

    handleClick= (event) => {
        const formData = new URLSearchParams();
        formData.append('id', this.props.id);
        formData.append('ami', this.props.acc);
        axios.post("http://localhost:8080/Projet/friends", formData)
        .then(r => {r.data.code === undefined ? alert("Friend added!") : alert(r.data.code + ': ' + r.data.mess)})
        .catch(errorRep => {alert(errorRep)})
    }

    render() { 
        return <div className="btn-u">
            <h className="bouton ami-btn" onClick={this.props.btn}>Amis</h>
            <h className="bouton ami-btn" onClick={this.handleClick}>Ajouter</h>
        </div>;
    }
}
 
export default AddF;