import React, {Component} from "react"
import Message from './Message'
import axios from 'axios'

class ListM extends Component{
    constructor(props){
        super(props);
        this.state={
            lmsg: []
        }
    }

    componentWillMount = () => {
        axios.get("http://localhost:8080/Projet/messages", {params:{
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

    render(){
        var ncl= [];
        for (var index = 0; this.state.lmsg[index]; index++){
            ncl.push(<Message nc={this.state.lmsg[index]} prof={this.props.prof} rep={this.props.rep}/>)
        }
        return <div>
            {ncl}
        </div>
    }
}


export default ListM