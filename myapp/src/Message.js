import React, {Component} from "react"
import moment from 'moment'
import { Reply } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

//attribut: idAuthor, nom, contenu, date, like

class Message extends Component{

    render(){
        var nc = this.props.nc;
        return <div className="rep-rep">
            <div className="rep-ctn">
                {nc.text}
            </div>
            <div className="rep-btn">
                <IconButton onClick={() => this.props.rep(nc._id.$oid)}>
                    <Reply />
                </IconButton>
            </div>
            <div className="rep-aut" onClick={() => this.props.prof(nc.id_author)}>
                @{nc.id_author}
            </div>
            <div className="rep-date">
                {moment(nc.date.$date).format('YYYY-MM-DD H:mm:ss')}
            </div>
        </div>
    }
}

export default Message