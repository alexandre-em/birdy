import React, {Component} from "react"
import Login from "./Login"
import Logout from "./Logout"
import Search from './Search'

const logoB = "https://thumbs.dreamstime.com/b/eagle-icon-calibre-de-logo-oiseau-pr%C3%A9dateur-vecteur-105597952.jpg"

class NavigationPanel extends Component{

    render(){
        return <div className='nav-wrapper'>
                <img className="logo" alt="" onClick={this.props.home} src={logoB}  width="80" height="80"/>
                <Search profS={this.props.profS} home={this.props.home}/>
                <div className="nav-icon" >
                    {this.props.isConnected === false ? <Login log={this.props.log} sign={this.props.signIn}/>: <Logout acc={this.props.username} log={this.props.log} prof={this.props.prof}/> }
                </div>
            </div>;
    }
}

export default NavigationPanel