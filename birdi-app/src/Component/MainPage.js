import { Avatar, IconButton } from '@material-ui/core'
import { Image } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './css/MainPage.css'
import { storage } from './firebase'
import ListeMessage from './ListeMessage'
import axios from './axios'
import Pusher from 'pusher-js'

function MainPage({ id, timeOut, user, setUser, setActive ,load, setLoad, idMsg, setIdMsg}) {
    const [comment, setComment] = useState('')
    const [image, setImage] = useState(null)
    const [send, setSend] = useState(false)
    const [avatar, setAvatar] = useState("")

    const [mur, setMur] = useState([])

    const getMessageList = async () => {
        setLoad('load')
        await axios.get('/messages', {params:{
            id: "",
            request: "",
            filtre: "",
            mur: id
        }, data:{}
        })
        .then(res => { 
            res.data.code === undefined ?
                setMur(JSON.parse(res.data.id)):alert(res.data.code+ ": "+ res.data.mess)
                setLoad('')
        })
        .catch(err => alert(err+" "+id))
    } 

    const getInfoUser = () => {
        setLoad('load')
        axios.get('/user', {params: {
            username: id,
        }, data:{}})
        .then(res => {
            var usr = res.data
            res.data.code === undefined ?
                setAvatar(usr.imgUrl) : alert(usr.code + ': ' + usr.mess)
                setLoad('')
        })
    }

    useEffect(() => {
        const pusher = new Pusher('2eba10f6abd744b48515', {
            cluster: 'eu'
          });
      
        const channel = pusher.subscribe('messages');
          channel.bind('insert', (data) => {
            getMessageList()
          });
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const pusher = new Pusher('2eba10f6abd744b48515', {
            cluster: 'eu'
          });
      
        const channel = pusher.subscribe('messages');
          channel.bind('delete', (data) => {
            getMessageList()
          });
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getMessageList()
        getInfoUser()
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const postComment = async (url) => {
        if(load!=='load') setLoad('load')
        const formData = new URLSearchParams();
        formData.append('id', id)
        formData.append('Message', comment)
        formData.append('idmsg', '')
        formData.append('imgUrl', url)
        await axios.post('/messages', formData)
        .then(res => {
            res.data.code !== undefined ? 
                ((res.data.code === "458" || res.data.code === "504")?
                    timeOut() : alert(res.data.code + ": " + res.data.mess))
                    : alert("Message envoye !")
                    setLoad('')
        })
        setComment("")
    }

    const rmMsg = async (idMsg) => {
        setLoad('load')
        axios.delete('/messages?idMessage='+idMsg+'&id='+id+'&idRep=')
            .then(res => {
                res.data.code !== undefined?
                    ((res.data.code === '458' || res.data.code === '504')?
                        timeOut():
                        alert(res.data.code+': '+res.data.mess))
                    :alert("Message deleted")
                    setLoad('')
                })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postComment('')
    }

    const handleUpload = () => {
        setLoad('load')
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
            <div className="main__header">
                <h3>Home</h3>
            </div>
            <div className="main__form">
                <Avatar alt="" style={{width:"50px", height:"50px"}} src={avatar} />
                <div className="main__form-inp">
                    <form>
                        <input type="textarea" 
                            className="comment-form"
                            value={comment}
                            placeholder="What's happening?"
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
                                    <span>Send</span>
                                </div>:
                                <div className="comment-submit active" onClick={(e) => {image?handleUpload():handleSubmit(e)}}>
                                    <span>Send</span>
                                </div>}
                        </div>
                    </form>
                </div>
            </div>
            <ListeMessage id={id} mur={mur} timeOut={timeOut} setUser={setUser} setActive={setActive} rmMsg={rmMsg} setIdMsg={setIdMsg}/>
        </div>
    )
}

export default MainPage
