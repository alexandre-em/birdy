import React, { useEffect, useState } from 'react'
import { ChatBubbleOutline, Favorite, FavoriteBorder, Share,  Delete } from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
import axios from './axios'

function MessageContainer({ idMsg, prenom, id, id_author, date, text, avatar, image, comment, like, timeOut, setUser, setActive, rmMsg, setIdMsg, setLoad}) {

    const [fav, setFav] = useState(like.includes(id))
    const [nbFav, setNbFav] = useState(like.length)

    const handleLike = () => {
        setFav(!fav);
        (!fav? setNbFav(nbFav+1):setNbFav(nbFav-1))
    }

    const swapProfile = () => {
        setUser(id_author)
        setActive("Profile")
    }

    const liker = async () => {
        await axios.put('/messages?idmsg=' + idMsg + "&id=" + id)
        .then(res => {
            res.data.code !== undefined ?
                ((res.data.code === "458" || res.data.code === "504")? 
                    timeOut()
                    :alert(res.data.code+": "+res.data.mess))
            : handleLike()
        })
    }

    const handleRep = () => {
        setIdMsg(idMsg)
        setActive("Reply")
    }

    useEffect(() => {
        setNbFav(like.length)
        setFav(like.includes(id))
    // eslint-disable-next-line
    }, [like])

    return (
        <div className="message">
            <Avatar alt="" style={{width:"50px", height:"50px"}} src={avatar} onClick={swapProfile} />
            <div className="message-body">
                <div className="message-detail" onClick={swapProfile}>
                    <span><b>{prenom} </b></span>
                    <span> @{id_author} </span> · 
                    <span> {date}</span>
                </div>
                <div className="message-container">
                    <p>{text}</p>
                    {image!==""?<img src={image} alt="" onClick={() => setLoad("img", image)}/>:""}
                </div>
                <div className="message-button">
                    <span>
                        <IconButton onClick={handleRep}>
                            <ChatBubbleOutline fontSize="small"/>
                        </IconButton>
                    {comment.length}</span>
                    <span>
                        <IconButton onClick={liker}>
                            {fav?<Favorite color="secondary" fontSize="small" />:<FavoriteBorder fontSize="small"/>}
                        </IconButton>
                    {nbFav}</span>
                    <IconButton>
                        <Share fontSize="small"/>
                    </IconButton>
                    {id === id_author?
                        <IconButton onClick={() => rmMsg(idMsg)}>
                            <Delete fontSize="small"/>
                        </IconButton>:""}
                </div>
            </div>
        </div>
    )
}

export default MessageContainer
