import React, { Component } from 'react'
import ReplyCtn from './ReplyCtn'
import { IconButton } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import axios from 'axios'

export class ReplyForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            contenu: "",
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit= (event) => {
        event.preventDefault();
        const formData = new URLSearchParams();
        formData.append('id', this.props.id);
        formData.append('Message', this.state.contenu);
        formData.append('idmsg', this.props.idM);
        axios.post("http://localhost:8080/Projet/messages", formData)
        .then(r => {r.data.code !== undefined ? alert(r.data.code + ": " +r.data.mess):alert("Message envoye !")})
        .catch(errorRep => {alert(errorRep)})
    }

    render() {
        var rep = this.props.rep
        var ar = []
        for (var index = 0; rep[index]; index++){
            ar.push(<ReplyCtn rep={rep[index]} rf={this.props.rf}/>)
        }
        return (
            <div >
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <textarea className="rep-w" 
                    value={this.state.contenu} 
                    name="contenu"
                    placeholder="Repondre..."
                    onChange={this.handleChange} required/>
                <IconButton type="submit">
                    <Send color="primary" />
                </IconButton>
                </form>
                {ar}
            </div>
        )
    }
}

export default ReplyForm
