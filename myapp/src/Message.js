import React, {Component} from "react"
import moment from 'moment'
import { Reply } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

//attribut: idAuthor, nom, contenu, date, like

class Message extends Component{

    render(){
        var nc = this.props.nc;
        return <div className="msg">
            <article>
                <span className="msg-content">
                    {nc.text}
                    <IconButton>
                        <Reply />
                    </IconButton>
                </span>
                <div className="btn-usr" onClick={() => this.props.prof(nc.id_author)}>
                    <h>{moment(nc.date).format('YYYY-MM-DD')} - </h>
                    <h>{nc.id_author}</h>
                </div>
			</article>
        </div>
    }
}

export default Message