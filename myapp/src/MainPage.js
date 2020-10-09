import React, {Component} from 'react';
import './index.css';
import NavigationPanel from './NavigationPanel'
import Signin from './Signin'
import FormLog from './FormLog'
import ListeM from './ListeM'
import Profil from './Profil'
import Utilisateur from './Utilisateur';
import ReplyPage from './ReplyPage';
import moment from 'moment'

class MainPage extends Component {
    constructor(){ 
        super();
        this.state = {
            username: localStorage.getItem('username') || '',
            connecte : JSON.parse(localStorage.getItem('connecte')) || false,
            page : '',
            puser: "",
            idMsg: "",
        };
        this.getConnected = this.getConnected.bind(this);
        this.setLogout = this.setLogout.bind(this);
        this.signIn = this.signIn.bind(this);
        this.homeP = this.homeP.bind(this);
        this.profil = this.profil.bind(this);

    }

    changeUsername = (log) => {
        localStorage.setItem("username", log)
        this.setState({username: log})
    }

    homeP(){
        this.setState({page: 'default'})
    }
    getConnected() {
        localStorage.setItem("connecte", 'true')
        this.setState({connecte: true, page: 'home'});
    }

    setLogout() {
        localStorage.removeItem("username")
        localStorage.removeItem("connecte")
        this.setState({connecte: false, page: 'toconnect'});
    }

    signIn(){
        this.setState({connecte: false, page: 'enregistrement'})
    }

    profil(){
        this.setState({page: 'profil'})
    }

    profilUser = (user) =>{
        this.setState({page: 'userp', puser: user})
    }

    replyM = (id) => {
        this.setState({idMsg: id, page: 'replyP'})
    }

    render() {
        switch(this.state.page){
            case 'enregistrement':
                return <div>
                    <Signin home={this.homeP}/>
                </div>;
            case 'toconnect':
                return <div>
                    <FormLog log={this.getConnected} acc={this.changeUsername} sign={this.signIn}/>
                </div>;
            case 'profil':
                return <div>
                    <NavigationPanel 
                        log={this.setLogout} isConnected={this.state.connecte} username={this.state.username} 
                        home={this.homeP} signIn={this.signIn} prof={this.profil} profS={this.profilUser}/>
                    <Profil home={this.homeP} connecte={this.state.connecte} logout={this.setLogout} acc={this.state.username} prof={this.profilUser} rep={this.replyM}/>
                </div>;
            case 'userp':
                return <div>
                    <NavigationPanel 
                        log={this.setLogout} isConnected={this.state.connecte} username={this.state.username} 
                        home={this.homeP} signIn={this.signIn} prof={this.profil} profS={this.profilUser}/>
                    <Utilisateur home={this.homeP} connecte={this.state.connecte} logout={this.setLogout} id={this.state.username} acc={this.state.puser} rep={this.replyM}/>
                </div>;
            case 'replyP':
                return <div>
                    <NavigationPanel 
                        log={this.setLogout} isConnected={this.state.connecte} username={this.state.username} 
                        home={this.homeP} signIn={this.signIn} prof={this.profil} profS={this.profilUser}/>
                    <ReplyPage id={this.state.username} logout={this.setLogout} idM={this.state.idMsg} profS={this.profilUser}/>
                </div>
            default:
                return <div>
                    <NavigationPanel 
                        log={this.setLogout} isConnected={this.state.connecte} username={this.state.username} 
                        home={this.homeP} signIn={this.signIn} prof={this.profil} profS={this.profilUser}/>
                    <div className="rep">
                        <div className="rep-msg">
                            <div className="rep-ctn title wel-tit">
                                <h1>Bonjour {this.state.username},</h1>
                            </div>
                            <div className="rep-date">{moment(new Date()).format('YYYY-MM-DD H:mm')}</div>
                        </div>
                        {this.state.connecte === true ? "" : <h2 className="rep-ctn">Veuillez vous connecter ou vous inscrire pour voir les messages. Demo user/password : "demo"</h2> }
                        {this.state.connecte === true ? <ListeM canSend={true} acc={this.state.username} prof={this.profilUser} rep={this.replyM} logout={this.setLogout} like={this.state.username}/>: "" }
                    </div>
                 </div>;
        }
    }
}

export default MainPage;