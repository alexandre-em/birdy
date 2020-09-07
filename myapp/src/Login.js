import React, {Component} from "react"
import { PowerSettingsNew, VpnKey } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

class Login extends Component{

    render(){
        return <div>
            <IconButton>
                <PowerSettingsNew onClick={this.props.log} fontSize="large"/>
            </IconButton>
            <IconButton>
                <VpnKey onClick={this.props.sign} fontSize="large"/>
            </IconButton>
        </div>
    }
}

export default Login