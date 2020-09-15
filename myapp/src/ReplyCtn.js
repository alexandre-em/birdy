import React, { Component } from 'react'
import moment from 'moment'
import { IconButton } from '@material-ui/core'
import { Reply, FavoriteBorder, Favorite, Delete } from '@material-ui/icons'
import axios from 'axios'

export class ReplyCtn extends Component {
    constructor(props){
        super(props)
        this.state={
            like:false,
            lusr:[],
            rps: JSON.parse(this.props.rep)
        }
    }

    componentWillMount = () => {
        this.infos()

    }

    infos = () => {
        axios.get("http://localhost:8080/Projet/messages", {params:{
            mur: '',
            request: '',
            filtre: '',
            id: this.state.rps._id.$oid
        }, data:{}})
        .then(response => { response.data.code === undefined ?
            this.setState({
                like: response.data.like.includes(this.props.id),
                lusr: response.data.like
            }) :alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
    }

    like = async () => {
        await axios.put("http://localhost:8080/Projet/messages?idmsg=" + this.state.rps._id.$oid + "&id=" + this.props.id)
        .then(r => 
            {r.data.code !== undefined ? 
                (r.data.code === "458"? 
                    this.timeOut()
                    :alert(r.data.code+": "+r.data.mess))
                :this.infos()})
        .catch(errorRep => {alert(errorRep)})
    }

    render() {
        return (
            <div className="rep-rep">
                <div className="rep-ctn">
                    {this.state.rps.text}
                </div>
                <div className="rep-btn">
                    {this.state.rps.id_author === this.props.id ?
                    <IconButton onClick={() => this.props.del(this.state.rps._id.$oid)}>
                        <Delete />
                    </IconButton>:""}
                </div>
                <div className="rep-aut" onClick={() => this.props.profS(this.state.rps.id_author)}>
                    @{this.state.rps.id_author}
                </div>
                <div className="rep-date">
                    <IconButton onClick={this.like}>
                        {this.state.like? <Favorite color="secondary"/>:<FavoriteBorder />}
                        <div style={{ fontSize: 14 }}>{this.state.lusr.length}</div>
                    </IconButton>
                    <IconButton onClick={() => {this.props.rf(this.state.rps._id.$oid)}}>
                        <Reply />
                    </IconButton>
                    {moment(this.state.rps.date.$date).format('YYYY-MM-DD H:mm:ss')}
                </div>
            </div>
        )
    }
}

export default ReplyCtn
