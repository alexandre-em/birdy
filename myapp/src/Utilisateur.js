import React, {Component} from "react"
import ListeM from './ListeM'
import ListA from './ListA'
import AddF from './AddF'
import axios from 'axios'
import RmF from "./RmF"
import { Avatar } from "@material-ui/core"

const colorRand = [
    "rgb(197, 114, 19)",
    "rgb(197, 179, 19)",
    "rgb(84, 197, 19)",
    "rgb(19, 197, 159)",
    "rgb(19, 161, 197)",
]

const avStyleProf = () => {
    return {
        backgroundColor: "rgb(129, 55, 55)", 
        width: "150px", 
        height: "150px",
        fontSize: "50pt",
    }
}

const avStyle = () => {
    return {
        backgroundColor: colorRand[Math.round((Math.random() * (colorRand.length-1)))], 
        width: "150px", 
        height: "150px",
        fontSize: "50pt",
}}

class Utilisateur extends Component{
    constructor(props){
        super(props);
        this.state={
            nom: "",
            prenom: "",
            username: this.props.acc,
            dateN: "",
            email: "",
            ami: false,
            addBtn: false,
            avatar: this.props.acc === this.props.id? 
                avStyleProf()
                :avStyle()
        }
        this.switchAmi = this.switchAmi.bind(this)
        this.switchMsg = this.switchMsg.bind(this)
    }

    isFriend = () => {
        axios.get("http://localhost:8080/Projet/friends", {params:{
            id: this.props.id,
        }, data:{}})
        .then(response => {
            var lami= response.data.id
            response.data.code ===undefined ?
            this.setState({
                addBtn: lami.includes(this.state.username)
            }) : console.log("")
        })
        .catch(errorRep => {alert(errorRep)})
    }

    changeUser = (user) => {
        this.setState({
            username: user,
            ami: false,
            avatar: user === this.props.id? 
                avStyleProf()
                :avStyle()
        })
        this.isFriend()
        this.infoUser()
    }

    infoUser = () => {
        axios.get("http://localhost:8080/Projet/user", {params:{
            username: this.state.username,
        }, data:{}})
        .then(response => {
            response.data.code ===undefined ? this.setState({
                nom: response.data.nom,
                prenom: response.data.prenom,
                dateN: response.data.dateN,
                email: response.data.email
            }) :alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
    }

    componentWillMount = () => {
        this.infoUser()
        this.isFriend()
    }

    switchAmi(){
        this.setState({ami: true})
    }

    switchMsg(){
        this.setState({ami:false})
    }

    render(){
        return <div className="zentai">
            <div className="prof-page">
                <div className="left">
                    <div className="infos">
                        <Avatar style={this.state.avatar}>{this.state.username.charAt(0).toUpperCase()}</ Avatar>
                        <h1 className="title">{this.state.prenom} {this.state.nom}</h1>
                        <i>@{this.state.username}</i>
                        <br />
                        Ne le {this.state.dateN}
                        <br />
                        Contact : {this.state.email}
                        {this.props.id !== this.state.username ? 
                            (this.state.addBtn? 
                                <RmF id={this.props.id} btn={this.switchAmi} acc={this.state.username} logout={this.props.logout}/> :
                                <AddF id={this.props.id} btn={this.switchAmi} acc={this.state.username} logout={this.props.logout}/> ) : 
                            <div className="bouton ami-btn" onClick={this.switchAmi}>Followers</div> }
                    </div>
                </div>

                <div className="main">
                    <div className="mur">
                        <div className="rep-msg">
                            <div className="rep-ctn title wel-tit">
                                {this.state.ami === true ? <h1>Followers de {this.state.username}</h1>:<h1>Mur de {this.state.username}</h1>}
                            </div>
                        </div>
                        {this.state.ami === true ? <ListA acc={this.state.username} prof={this.changeUser} retour={this.switchMsg}/>: <ListeM like={this.props.id} acc={this.props.acc} prof={this.changeUser} rep={this.props.rep} logout={this.props.setLogout}/> }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Utilisateur