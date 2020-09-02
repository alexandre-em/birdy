import React, {Component} from "react"
import Message from './Message'
import axios from 'axios'

class ListM extends Component{
    constructor(props){
        super(props);
        this.state={
            lmsg: [
                {comment:"Un message", name:"himouto"},
                {comment: "Un autre message", name: "hito"}]
        }
    }

    componentWillMount = () => {
        axios.get("http://localhost:8080/Projet/messages", {params:{
            id: this.props.acc,
            request: '',
            filtre: ''
        }, data:{}})
        .then(response => {
            var obj=JSON.parse(response.data.id);
            this.setState({
                lmsg: obj
            })
        })
        .catch(errorRep => {alert(errorRep)})
    }

    render(){
        var ncl= [];
        for (var index = 0; this.state.lmsg[index]; index++){
            ncl.push(<Message nc={this.state.lmsg[index]}/>)
        }
        return <div className="list-msg">
            {ncl}
        </div>
    }
}


export default ListM