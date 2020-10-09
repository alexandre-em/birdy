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
        axios.get("https://birdy-em.herokuapp.com/friends", {params:{
            id: this.props.acc,
        }, data:{}})
        .then(response => {
            response.data.code === undefined ? this.setState({
                lami: response.data.id.slice(1,-1)
            }) : alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
    }

    render(){
        var larray=this.state.lami.split(", ")
        var ami=[];
        for (var index = 0; larray[index]; index++){
            ami.push(<Ami key={larray[index]} ami={larray[index]} prof={this.props.prof} retour={this.props.retour}/>)
        }
        
        return <div>
            <div className="list-ami">{ami}</div>
            <div className="retour">
                <div className="bouton" onClick={this.props.retour} >Retour</div>
            </div>
        </div>
    }
}

export default ListA