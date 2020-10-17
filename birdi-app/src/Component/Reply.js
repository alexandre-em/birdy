import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect} from 'react'
import axios from './axios'
import Pusher from 'pusher-js'
import { db, storage } from './firebase'
import firebase from 'firebase'
import { Image } from '@material-ui/icons'
import MessageContainer from './Message'
import moment from 'moment'
import ListeMessage from './ListeMessage'

function Reply({ id, timeOut, user, setUser, setActive ,load, setLoad, idMsg, setIdMsg}) {
    const [comment, setComment] = useState('')
    const [image, setImage] = useState(null)
    const [send, setSend] = useState(false)
    const [avatar, setAvatar] = useState("")

    const [rep, setRep] = useState({
        date: new Date(), imgUrl: '', like: [], name: '', comment:[], id_author:'', text:'', avatar:'', origin: ''
    })

    const getMessage = async () => {
        setLoad('load', '')
        await axios.get('/messages', {params:{
            id: idMsg,
            request: "",
            filtre: "",
            mur: "",
            search:"",
        }, data:{}
        })
        .then(res => { 
            if (res.data.code === undefined) {
                setRep(res.data)
            } else {
                alert(res.data.code+ ": "+ res.data.mess)
            }
                setLoad('', '')
        })
        .catch(err => alert(err+" "+id))
    } 

    const getInfoUser = () => {
        setLoad('load', '')
        axios.get('/user', {params: {
            username: id,
        }, data:{}})
        .then(res => {
            var usr = res.data
            res.data.code === undefined ?
                setAvatar(usr.imgUrl) : alert(usr.code + ': ' + usr.mess)
                setLoad('', '')
        })
    }

    useEffect(() => {
        const pusher = new Pusher('2eba10f6abd744b48515', {
            cluster: 'eu'
          });
      
        const channel = pusher.subscribe('messages');
          channel.bind('insert', (data) => {
            getMessage()
          });
    // eslint-disable-next-line
    }, [])


    useEffect(() => {
        const pusher = new Pusher('2eba10f6abd744b48515', {
            cluster: 'eu'
          });
      
        const channel = pusher.subscribe('messages');
          channel.bind('delete', (data) => {
            getMessage()
          });
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getInfoUser()
        getMessage()
        // eslint-disable-next-line
    }, [user, idMsg])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const reply = () => {
        db.collection("notifications")
            .doc(rep.id_author)
            .collection("reply")
            .add({
                idMsg: idMsg,
                message: comment,
                author: id,
                avatar: avatar,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        alert("Message envoye !")
        setComment("")
    }

    const postComment = async (url) => {
        if(load!=='load') setLoad('load', '')
        const formData = new URLSearchParams();
        formData.append('id', id)
        formData.append('Message', '@'+rep.id_author+' '+comment)
        formData.append('idmsg', idMsg)
        formData.append('imgUrl', url)
        await axios.post('/messages', formData)
        .then(res => {
            res.data.code !== undefined ? 
                ((res.data.code === "458" || res.data.code === "504")?
                    timeOut() : alert(res.data.code + ": " + res.data.mess))
                    : reply()
                    setLoad('', '')
        })
    }

    const rmMsg = async (idRep) => {
        setLoad('load', '')
        axios.delete('/messages?idMessage='+idMsg+'&id='+id+'&idRep='+idRep)
            .then(res => {
                res.data.code !== undefined?
                    ((res.data.code === '458' || res.data.code === '504')?
                        timeOut():
                        alert(res.data.code+': '+res.data.mess))
                    :alert("Message deleted")
                    setLoad('', '')
                })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postComment('')
    }

    const handleUpload = () => {
        setLoad('load', '')
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                if (snapshot.bytesTransferred === snapshot.totalBytes)
                    setSend(true)
            },
            (error) => { console.log(error) },
            () => {
                // push to the db, the link of image
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        postComment(url)
                    })
            }
        )
        console.log("uploaded")
        setSend(false)
    }
    return (
        <div className="mainPage">
            <div className="main__header rep">
                <h3>Reply to </h3>
            </div>
            <MessageContainer key={idMsg}
                prenom={rep.name}
                id={id}
                id_author={rep.id_author}
                idMsg={idMsg}
                date={moment(rep.date.$date).format('YYYY/MM/DD')}
                text={rep.text}
                avatar={rep.avatar}
                image={rep.imgUrl}
                comment={rep.comment}
                like={rep.like}
                timeOut={timeOut}
                setUser={setUser}
                setActive={setActive}
                setIdMsg={setIdMsg}
                setLoad={setLoad}
                rmMsg={rmMsg} />
            <div className="main__form">
                <Avatar alt="" style={{width:"50px", height:"50px"}} src={avatar} />
                <div className="main__form-inp">
                    <form>
                        <input type="textarea" 
                            className="comment-form"
                            value={comment}
                            placeholder="Reply ..."
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="comment-btn">
                            <div className="comment-pic">
                                <label htmlFor="upload-photo">
                                    <input type="file"
                                        id="upload-photo"
                                        name="upload-photo"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{display:"none"}}/>
                                    <IconButton component="span">
                                        <Image />
                                    </IconButton>
                                </label>
                                <span style={{color: "#b4b4b4", fontSize: "10pt"}}>{image?"Loaded: "+image.name:"No image selected"}</span>
                                <span style={{color: "#b4b4b4", fontSize: "10pt"}}>{send?"Uploading picture, don't refresh...":""}</span>
                            </div>
                            {(comment==="" && image===null)?
                                <div className="comment-submit empty">
                                    <span>Reply</span>
                                </div>:
                                <div className="comment-submit active" onClick={(e) => {image?handleUpload():handleSubmit(e)}}>
                                    <span>Reply</span>
                                </div>}
                        </div>
                    </form>
                </div>
            </div>
            <ListeMessage id={id} mur={rep.comment.map((value) =>{ return JSON.parse(value)})} timeOut={timeOut} setUser={setUser} setActive={setActive} rmMsg={rmMsg} setLoad={setLoad} setIdMsg={setIdMsg}/>
        </div>
    )
}

export default Reply
