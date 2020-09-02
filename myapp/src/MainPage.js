import React, {Component} from 'react';
import './index.css';
import NavigationPanel from './NavigationPanel'
import Signin from './Signin'
import FormLog from './FormLog'
import ListeM from './ListeM'
import FormM from './FormM'
import Profil from './Profil'
import Utilisateur from './Utilisateur';

class MainPage extends Component {
    constructor(){ 
        super();
        this.state = {
            username: "anijya",
            connecte : true,
            page : 'default',
            puser: "",
        };
        this.getConnected = this.getConnected.bind(this);
        this.setLogout = this.setLogout.bind(this);
        this.signIn = this.signIn.bind(this);
        this.homeP = this.homeP.bind(this);
        this.profil = this.profil.bind(this);
    }

    changeUsername = (log) => {
        this.setState({
            username: log
        })
    }

    homeP(){
        this.setState({page: 'default'})
    }
    getConnected() {
        this.setState({connecte: true, page: 'home'});
    }

    setLogout() {
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
                    <Profil home={this.homeP} connecte={this.state.connecte} acc={this.state.username} prof={this.profilUser}/>
                </div>;
            case 'userp':
                return <div>
                    <NavigationPanel 
                        log={this.setLogout} isConnected={this.state.connecte} username={this.state.username} 
                        home={this.homeP} signIn={this.signIn} prof={this.profil} profS={this.profilUser}/>
                    <Utilisateur home={this.homeP} connecte={this.state.connecte} id={this.state.username} acc={this.state.puser} prof={this.profilUser}/>
                </div>;
            default:
                return <div>
                    <NavigationPanel 
                        log={this.setLogout} isConnected={this.state.connecte} username={this.state.username} 
                        home={this.homeP} signIn={this.signIn} prof={this.profil} profS={this.profilUser}/>
                    <div className="main">
                        <div className="mur">
                            <div className="commentaire">
                                <h1 className="title">Bonjour {this.state.username}</h1>
                                {this.state.connecte === true ? <FormM username={this.state.username}/>: "" }
                                <ListeM acc={this.state.username} prof={this.profilUser}/>
                            </div>
                        </div>
                    </div>
                 </div>;
        }
    }
}

export default MainPage;