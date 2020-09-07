import React, {Component} from "react"
import axios from "axios"
import { Send } from '@material-ui/icons';
import { IconButton } from '@material-ui/core'

class FormM extends Component{
    constructor(props){
        super(props);
        this.state = {
            contenu: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit= (event) => {
        event.preventDefault();
        const formData = new URLSearchParams();
        formData.append('id', this.props.username);
        formData.append('Message', this.state.contenu);
        formData.append('idmsg', '');
        axios.post("http://localhost:8080/Projet/messages", formData)
        .then(r => {r.data.code !== undefined ? alert(r.data.code + ": " +r.data.mess):alert("Message envoye !")})
        .catch(errorRep => {alert(errorRep)})
    }

    render(){
        return <div className="commentaire">
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <br />
                <textarea
                    value={this.state.contenu} 
                    name="contenu"
                    placeholder="Nouveau message"
                    className="commentbox"
                    onChange={this.handleChange} required/>
                <IconButton type="submit">
                    <Send color="primary" />
                </IconButton>
            </form>
        </div>
    }
}

export default FormM