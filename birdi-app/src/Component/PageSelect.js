import React, { useState } from 'react'
import MainPage from './MainPage'
import Profile from './Profile'
import SearchPage from './SearchPage'
import Reply from './Reply'


function PageSelect({ active, user, setUser, setActive, id, timeOut, load, setLoad}) {
    const [idMsg, setIdMsg] = useState('')

    switch(active){
        case "Profile":
            return (
                <Profile id={id} timeOut={timeOut} user={user} setUser={setUser} setActive={setActive} load={load} setLoad={setLoad} setIdMsg={setIdMsg} idMsg={idMsg}/>
            )
        case "Search":
            return (
                <SearchPage timeOut={timeOut} setActive={setActive} load={load} setLoad={setLoad}/>
            )
        case "Reply":
            return(
                <Reply id={id} timeOut={timeOut} user={user} setUser={setUser} setActive={setActive} load={load} setLoad={setLoad} setIdMsg={setIdMsg} idMsg={idMsg}/>
            )
        default:
            return (
                <MainPage id={id} timeOut={timeOut} user={user} setUser={setUser} setActive={setActive} load={load} setLoad={setLoad} setIdMsg={setIdMsg} idMsg={idMsg}/>
            )
    }
}

export default PageSelect