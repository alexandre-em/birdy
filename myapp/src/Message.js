import React, {Component} from "react"
import moment from 'moment'
import { Reply, Favorite, FavoriteBorder, Delete } from "@material-ui/icons"
import { Avatar, IconButton } from "@material-ui/core"
import axios from 'axios'

const colorRand = [
    {backgroundColor: "rgb(197, 114, 19)"},
    {backgroundColor: "rgb(197, 179, 19)"},
    {backgroundColor: "rgb(84, 197, 19)"},
    {backgroundColor: "rgb(19, 197, 159)"},
    {backgroundColor: "rgb(19, 161, 197)"},
]

const colorProf = {backgroundColor: "rgb(129, 55, 55)"}

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
                <Avatar style={nc.id_author === this.props.like ? colorProf : colorRand[nc.id_author.charCodeAt(0)%5]}>{nc.id_author.charAt(0).toUpperCase()}</Avatar>
                <p>{nc.text}</p>
            </div>
            <div className="rep-btn">
                {nc.id_author === this.props.like ?
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
