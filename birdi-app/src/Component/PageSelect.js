import React, { useState } from 'react'
import MainPage from './MainPage'
import Profile from './Profile'
import SearchPage from './SearchPage'
import Reply from './Reply'
import axios from './axios'
import Notif from './Notif'

function PageSelect({ active, user, setUser, setActive, id, timeOut, load, setLoad, search, setSearch, click, notif }) {
    const [idMsg, setIdMsg] = useState('')

    const rmMsg = async (idMsg) => {
        setLoad('load','')
        axios.delete('/messages?idMessage='+idMsg+'&id='+id+'&idRep=')
            .then(res => {
                res.data.code !== undefined?
                    ((res.data.code === '458' || res.data.code === '504')?
                        timeOut():
                        alert(res.data.code+': '+res.data.mess))
                    :alert("Message deleted")
                    setLoad('','')
                })
    }

    switch(active){
        case "Profile":
            return (
                <Profile id={id} timeOut={timeOut} user={user} setUser={setUser} setActive={setActive} load={load} setLoad={setLoad} setIdMsg={setIdMsg} idMsg={idMsg}/>
            )
        case "Search":
            return (
                <SearchPage timeOut={timeOut} setActive={setActive} setLoad={setLoad} setUser={setUser} setIdMsg={setIdMsg} id={id} search={search} setSearch={setSearch} click={click}/>
            )
        case "Reply":
            return(
                <Reply id={id} timeOut={timeOut} user={user} setUser={setUser} setActive={setActive} load={load} setLoad={setLoad} setIdMsg={setIdMsg} idMsg={idMsg}/>
            )
        case "Notification":
            return(
                <Notif id={id} setActive={setActive} setUser={setUser} timeOut={timeOut} setIdMsg={setIdMsg} notif={notif}/>
            )
        default:
            return (
                <MainPage rmMsg={rmMsg} id={id} timeOut={timeOut} user={user} setUser={setUser} setActive={setActive} load={load} setLoad={setLoad} setIdMsg={setIdMsg} idMsg={idMsg}/>
            )
    }
}

export default PageSelect