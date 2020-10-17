import { Avatar, IconButton } from '@material-ui/core'
import { Reply, VisibilityOff } from '@material-ui/icons';
import React from 'react'

function NElem({ id, data ,setActive, setUser, setIdMsg, toDelete }) {

    const swapProfile = () => {
        setUser(data.author);
        setActive("Profile");
    }

    const toMessage = () => {
        setIdMsg(data.idMsg)
        setActive("Reply")
    }

    

    return (
        <div className="message">
            <Avatar alt="" style={{width:"50px", height:"50px"}} src={data.avatar} onClick={swapProfile} />
            <div className="message-body">
                <div className="message-detail" onClick={swapProfile}>
                    <span> <b>@{data.author}</b> </span> · 
                    <span> {new Date(data.timestamp?.toDate()).toUTCString()}</span>
                </div>
                <div className="message-container">
                    <p>{data.message}</p>
                </div>
                <div className="delete" style={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton onClick={toMessage}>
                        <Reply />
                    </IconButton>
                    <IconButton onClick={() => toDelete(data)}>
                        <VisibilityOff />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default NElem
