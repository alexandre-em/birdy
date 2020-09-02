import React, {Component} from "react"

class Login extends Component{
    constructor(){
        super();
        this.connexion=this.connexion.bind(this);
    }

    connexion(){
       return this.props.log
    }

    render(){
        return <div className="bouton">
            <button className="connexion" onClick={this.props.log}>Login</button>
        </div>
    }
}

export default Login