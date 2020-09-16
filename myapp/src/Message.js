import React, {Component} from "react"
import moment from 'moment'
import { Reply, Favorite, FavoriteBorder, Delete } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"
import axios from 'axios'

class Message extends Component{
    constructor(props){
        super(props);
        this.state= {
            like:false,
            lusr:[]
        }
    }

    timeOut= () => {
        this.props.logout();
        alert("[Time out] Deconnecte !")
    }

    componentWillMount = () => {
        this.infos()
    }

    infos = () => {
        axios.get("http://localhost:8080/Projet/messages", {params:{
            mur: '',
            request: '',
            filtre: '',
            id: this.props.nc._id.$oid
        }, data:{}})
        .then(response => { response.data.code === undefined ?
            this.setState({
                like: response.data.like.includes(this.props.like),
                lusr: response.data.like
            }) :alert(response.data.code + ': ' + response.data.mess)
        })
        .catch(errorRep => {alert(errorRep)})
    }

    like = async () => {
        await axios.put("http://localhost:8080/Projet/messages?idmsg=" + this.props.nc._id.$oid + "&id=" + this.props.like)
        .then(r => 
            {r.data.code !== undefined ? 
                (r.data.code === "458"? 
                    this.timeOut()
                    :alert(r.data.code+": "+r.data.mess))
                :this.infos()})
        .catch(errorRep => {alert(errorRep)})
    }

    render(){
        var nc = this.props.nc;
        return <div className="rep-rep">
            <div className="rep-ctn">
                {nc.text}
            </div>
            <div className="rep-btn">
                {nc.id_author === this.props.acc ?
                <IconButton onClick={() => this.props.del(this.props.nc._id.$oid)}>
                    <Delete />
                </IconButton>:""}
            </div>
            <div className="rep-aut" onClick={() => this.props.prof(nc.id_author)}>
                @{nc.id_author}
            </div>
            <div className="rep-date">
                <IconButton onClick={this.like}>
                    {this.state.like? <Favorite fontSize="small" color="secondary"/>:<FavoriteBorder fontSize="small" />}
                    <div style={{ fontSize: 14 }}>{this.state.lusr.length}</div>
                </IconButton>
                <IconButton onClick={() => this.props.rep(nc._id.$oid)}>
                    <Reply />
                </IconButton>
                {moment(nc.date.$date).format('YYYY-MM-DD H:mm:ss')}
            </div>
        </div>
    }
}

export default Message