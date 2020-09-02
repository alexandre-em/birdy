import React, {Component} from "react"
import moment from 'moment'

//attribut: idAuthor, nom, contenu, date, like

class Message extends Component{

    render(){
        var nc = this.props.nc;
        return <div className="msg">
            <article>
                <span><p>{nc.text}</p></span>
                <div className="btn-usr">
                    <h>{moment(nc.date).format('YYYY-MM-DD')} - </h>
                    <h onClick={() => this.props.prof(nc.id_author)}>{nc.id_author}</h>
                </div>
			</article>
        </div>
    }
}

export default Message