import React, { Component } from 'react'
import { IconButton } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import axios from 'axios'

export class ReplyForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            contenu: ""
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    timeOut= () => {
        this.props.logout();
        alert("[Time out] Deconnecte !")
    }

    handleSubmit= async (event) => {
        event.preventDefault();
        const formData = new URLSearchParams();
        formData.append('id', this.props.id);
        formData.append('Message', this.state.contenu);
        formData.append('idmsg', this.props.idM);
        await axios.post("https://birdy-em.herokuapp.com/messages", formData)
        .then(r => {r.data.code !== undefined ? ((r.data.code === "458" || r.data.code === "504")? this.timeOut():alert(r.data.code + ": " +r.data.mess)):alert("Message envoye !")})
        .catch(errorRep => {alert(errorRep)})
        this.setState({
            contenu: ""
        })
        this.props.reload()
    }

    render() {
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
            </div>
        )
    }
}

export default ReplyForm
