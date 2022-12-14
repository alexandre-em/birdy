import React, {Component} from "react"
import ListeM from './ListeM'
import ListA from './ListA'
import axios from 'axios'
import { Avatar } from "@material-ui/core"

const avStyle = {
    backgroundColor: "rgb(129, 55, 55)", 
    width: "150px", 
    height: "150px",
    fontSize: "50pt",
}

class Profil extends Component{
    constructor(props){
        super(props);
        this.state={
            nom: "",
            prenom: "",
            dateN: "",
            email: "",
            ami: false
        }
        this.switchAmi = this.switchAmi.bind(this)
        this.switchMsg = this.switchMsg.bind(this)
    }

    componentWillMount = () => {
        axios.get("https://birdy-em.herokuapp.com/user", {params:{
            username: this.props.acc,
        }, data:{}})
        .then(response => {
            response.data.code === undefined ?
            this.setState({
                nom: response.data.nom,
                prenom: response.data.prenom,
                dateN: response.data.dateN,
                email: response.data.email
            }) :alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
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
                        <Avatar style={avStyle}>{this.props.acc.charAt(0).toUpperCase()}</ Avatar>
                        <h1 className="title">{this.state.prenom} {this.state.nom}</h1>
                        <i>@{this.props.acc}</i>
                        <br />
                        Ne le {this.state.dateN}
                        <br />
                        Contact : {this.state.email}
                        <div className="bouton ami-btn" onClick={this.switchAmi}>Followers</div>
                    </div>
                </div>

                <div className="main">
                    <div className="mur">
                        <div className="rep-msg">
                            <div className="rep-ctn title wel-tit">
                                {this.state.ami === true ? <h1>Mes Followers</h1>:<h1>Mon mur</h1>}
                            </div>
                        </div>
                        {this.state.ami === true ? <ListA acc={this.props.acc} prof={this.props.prof} retour={this.switchMsg}/>: <ListeM canSend={true} acc={this.props.acc} prof={this.props.prof} rep={this.props.rep} logout={this.props.setLogout} like={this.props.acc}/> }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Profil