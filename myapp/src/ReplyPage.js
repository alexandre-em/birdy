import React, { Component } from 'react'
import ReplyForm from './ReplyForm'
import axios from 'axios'
import moment from 'moment'

export class ReplyPage extends Component {
    constructor(props){
        super(props);
        this.state={
            idM: this.props.idM,
            idA:"",
            msg:"",
            rep: [],
            date: new Date(),
        }
    }

    updateState = (idM2) => {
        this.setState({
            idM: idM2
        })
        this.repondre()
    }

    repondre = () => {
        axios.get("http://localhost:8080/Projet/messages", {params:{
            id: this.state.idM,
            request: '',
            filtre: '',
            mur: '',
        }, data:{}})
        .then(response => {
            response.data.code === undefined ? this.setState({
                idA: response.data.id_author,
                msg: response.data.text,
                rep: response.data.comment,
                date: new Date(response.data.date.$date),
            }):alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
    }

    componentWillMount = () => {
        this.repondre()
    }

    render() {
        return (
            <div className="rep">
                <div className="rep-msg">
                    <div className="rep-ctn">
                        <div className="rep-aut amsg">{this.state.idA}</div>
                        <p>{this.state.msg}</p>    
                        <div className="rep-date">{moment(this.state.date).format('YYYY-MM-DD H:mm:ss a')}</div>
                    </div>
                </div>
                <ReplyForm id={this.props.id} idM={this.state.idM} rep={this.state.rep} rf={this.updateState}/>
            </div>
        )
    }
}

export default ReplyPage
