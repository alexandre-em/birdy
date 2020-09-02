import React, {Component} from "react"
import moment from 'moment'

//attribut: idAuthor, nom, contenu, date, like

class Message extends Component{

    render(){
        var nc = this.props.nc;
        return <div className="msg">
            <article>
                <span><p>{nc.text}</p></span>
                <span>{moment(nc.date).format('YYYY-MM-DD')}    </span>
                <span><a href="test">   {nc.id_author}</a></span>
			</article>
        </div>
    }
}

export default Message