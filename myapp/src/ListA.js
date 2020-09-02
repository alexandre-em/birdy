import React, {Component} from "react"
import Ami from './Ami'
import axios from 'axios'

class ListA extends Component{
    constructor(){
        super();
        this.state={
            lami: ""
        }
    }

    componentWillMount = () => {
        axios.get("http://localhost:8080/Projet/friends", {params:{
            id: this.props.acc,
        }, data:{}})
        .then(response => {
            this.setState({
                lami: response.data.id.slice(1,-1)
            })
        })
        .catch(errorRep => {alert(errorRep)})
    }

    render(){
        var larray=this.state.lami.split(", ")
        var ami=[];
        for (var index = 0; larray[index]; index++){
            ami.push(<Ami ami={larray[index]} prof={this.props.prof} retour={this.props.retour}/>)
        }
        
        return <div>
            <div className="list-ami">{ami}</div>
            <div className="retour">
                <button onClick={this.props.retour} >Retour</button>
            </div>
        </div>
    }
}

export default ListA