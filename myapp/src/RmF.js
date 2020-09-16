import React, { Component } from 'react'
import axios from 'axios'

class RmF extends Component {
    timeOut= () => {
        this.props.logout();
        alert("[Time out] Deconnecte !")
    }

    handleClick= (event) => {
        axios.delete("http://localhost:8080/Projet/friends?id="+this.props.id+"&ami="+this.props.acc)
        .then(r => {r.data.code === undefined ? alert("Unfollowed") : (r.data.code === "458"? this.timeOut() : alert(r.data.code + ': ' + r.data.mess))})
        .catch(errorRep => {alert(errorRep)})
    }

    render() { 
        return <div className="btn-u">
            <h className="bouton ami-btn" onClick={this.props.btn}>Followers</h>
            <h className="bouton ami-btn unfollow" onClick={this.handleClick}>Unfollow</h>
        </div>;
    }
}

export default RmF
