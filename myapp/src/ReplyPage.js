import React, { Component } from 'react'
import ReplyForm from './ReplyForm'
import axios from 'axios'
import moment from 'moment'
import ReplyCtn from './ReplyCtn';

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

    timeOut= () => {
        this.props.logout();
        alert("[Time out] Deconnecte !")
    }

    updateState = (idM2) => {
        this.setState({
            idM: idM2
        })
        this.repondre()
    }

    repondre = () => {
        axios.get("https://birdy-em.herokuapp.com/messages", {params:{
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

    delete = async (idM) => {
        await axios.delete("https://birdy-em.herokuapp.com/messages?idMessage=" + this.props.idM + "&id=" + this.props.id+"&idRep="+ idM)
        .then(r => 
            {r.data.code !== undefined ? 
                ((r.data.code === "458" || r.data.code === "504")? 
                    this.timeOut()
                    :alert(r.data.code+": "+r.data.mess))
                :alert("Message supprime")})
        .catch(errorRep => {alert(errorRep)})
        this.repondre()
    }

    componentWillMount = () => {
        this.repondre()
    }

    render() {
        var ar = []
        for (var index = 0; this.state.rep[index]; index++){
            ar.push(<ReplyCtn rep={this.state.rep[index]} logout={this.props.logout} rf={this.updateState} profS={this.props.profS} id={this.props.id} del={this.delete}/>)
        }
        return (
            <div className="rep">
                <div className="rep-msg">
                    <div className="rep-ctn">
                        <div className="rep-aut" onClick={() => this.props.profS(this.state.idA)}>
                            @{this.state.idA}
                        </div>
                        <h2 style={{fontStyle: "oblique"}}>Réponse à :</h2>
                        <h3>{this.state.msg}</h3>    
                        <div className="rep-date">{moment(this.state.date).format('YYYY-MM-DD H:mm:ss a')}</div>
                    </div>
                </div>
                <ReplyForm reload={this.repondre} logout={this.props.logout} id={this.props.id} idM={this.state.idM}/>
                {ar}
            </div>
        )
    }
}

export default ReplyPage
