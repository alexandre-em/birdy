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
        return <div>
            <h className="bouton nav-bouton" onClick={this.props.log}>Login</h>
        </div>
    }
}

export default Login