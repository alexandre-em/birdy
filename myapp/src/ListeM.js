import React, {Component} from "react"
import Message from './Message'
import axios from 'axios'
import FormM from "./FormM";

class ListM extends Component{
    constructor(props){
        super(props);
        this.state={
            lmsg: []
        }
    }

    timeOut= () => {
        this.props.logout();
        alert("[Time out] Deconnecte !")
    }

    componentWillMount = () => {
        this.getLMsg()
    }

    getLMsg = () => {
        axios.get("https://birdy-em.herokuapp.com/messages", {params:{
            mur: this.props.acc,
            request: '',
            filtre: '',
            id: ''
        }, data:{}})
        .then(response => { response.data.code === undefined ?
            this.setState({
                lmsg: JSON.parse(response.data.id)
            }) :alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
    }

    delete = (idM) => {
        axios.delete("https://birdy-em.herokuapp.com/messages?idMessage=" + idM + "&id=" + this.props.acc+"&idRep=")
        .then(r => 
            {r.data.code !== undefined ? 
                ((r.data.code === "458" || r.data.code === "504")? 
                    this.timeOut()
                    :alert(r.data.code+": "+r.data.mess))
                :this.getLMsg()})
        .catch(errorRep => {alert(errorRep)})
    }

    render(){
        
        var ncl= [];
        for (var index = 0; this.state.lmsg[index]; index++){
            ncl.push(<Message key={this.state.lmsg[index]._id.$oid} acc={this.props.acc} nc={this.state.lmsg[index]} prof={this.props.prof} rep={this.props.rep} logout={this.props.logout} del={this.delete} like={this.props.like}/>)
        }
        return <div>
            {this.props.canSend? <FormM reload={this.getLMsg} logout={this.props.logout} username={this.props.acc}/>: ""}
            {ncl}
        </div>
    }
}


export default ListM