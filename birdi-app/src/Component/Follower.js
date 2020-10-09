import { Avatar, IconButton } from '@material-ui/core'
import { PersonAdd, PersonAddDisabled } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import axios from './axios'
import './css/ListAmi.css'

function Follower({ id, follow , setActive, setUser, timeOut, addFriend, rmFriend, followed}) {
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [avUrl, setAvUrl] = useState("")

    const [bouton, setBouton] = useState(id!==follow && !followed)

    const getInfos = async () => {
        axios.get('/user', {
            params: {
                username: follow,
            }, data:{}
        })
        .then(res => {
            setPrenom(res.data.prenom)
            setNom(res.data.nom)
            setAvUrl(res.data.imgUrl)
        })
    } 

    const handleClick = (fct) => {
        fct(follow)
        setBouton(!bouton)
    }

    const seeProfile = () => {
        setUser(follow)
        setActive("Profile")
    }

    useEffect(() => {
        setBouton(id!==follow && !followed)
        // eslint-disable-next-line
    }, [followed])

    useEffect(() => {
        getInfos()
        // eslint-disable-next-line
    }, [follow])

    return (
        <div className="ami">
            <div className="ami__infos">
                <Avatar alt="" style={{width:"50px", height:"50px"}} src={avUrl } onClick={seeProfile} />
                <div className="ami__details" onClick={seeProfile}>
                    <div className="ami__name">
                        <span>{prenom} </span>
                        <span><b> {nom}</b></span>
                    </div>
                    <div className="ami__id">
                        <i>@{follow}</i>
                    </div>
                </div>
            </div>
            <div className="ami__btn">
                {(bouton)?
                    <IconButton onClick={() => handleClick(addFriend)}>
                        <PersonAdd color="primary" fontSize="large" />    
                    </IconButton>:
                    (id!==follow?
                        <IconButton onClick={() => handleClick(rmFriend)}>
                            <PersonAddDisabled fontSize="large" />    
                        </IconButton>:"")}
            </div>
        </div>
    )
}

export default Follower
