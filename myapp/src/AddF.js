import React, {Component} from "react"
import axios from 'axios'

class AddF extends Component {

    timeOut= () => {
        this.props.logout();
        alert("[Time out] Deconnecte !")
    }

    handleClick= (event) => {
        const formData = new URLSearchParams();
        formData.append('id', this.props.id);
        formData.append('ami', this.props.acc);
        axios.post("http://localhost:8080/Projet/friends", formData)
        .then(r => {r.data.code === undefined ? alert("Followed!") : (r.data.code === "458"? this.timeOut() : alert(r.data.code + ': ' + r.data.mess))})
        .catch(errorRep => {alert(errorRep)})
    }

    render() { 
        return <div className="btn-u">
            <h className="bouton ami-btn" onClick={this.props.btn}>Followers</h>
            <h className="bouton ami-btn" onClick={this.handleClick}>Follow</h>
        </div>;
    }
}
 
export default AddF;