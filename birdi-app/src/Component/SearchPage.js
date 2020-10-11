import { Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './css/SearchPage.css'
import MessageContainer from './Message'
import axios from './axios'
import moment from 'moment'
import { Avatar } from '@material-ui/core'

function SearchPage({ id, setLoad, timeOut, setUser, setActive,setIdMsg,rmMsg, search, setSearch, click }) {
    const [tab, setTab] = useState("Trend")
    const [result, setResult] = useState([])

    const getResult = (e, type) => {
        e.preventDefault()
        switch(type){
            case "User":
                getResultUser()
                break;
            default:
                getResultMessage(type)
                break;
        }
    }

    const swapProfile = () => {
        setUser(search)
        setActive("Profile")
    }

    const getResultUser = () => {
        setLoad('load','')
        axios.get('/user', {params: {
            username: search,
        }, data:{}})
        .then(res => {
            var { nom, prenom, username, dateN, email, imgUrl} = res.data
            res.data.code === undefined ?
                setResult( () => {
                    return [<div className="message">
                    <Avatar alt="" style={{width:"50px", height:"50px"}} src={imgUrl} onClick={swapProfile} />
                    <div className="message-body">
                        <div className="message-detail" onClick={swapProfile}>
                            <span><b>{prenom} </b></span>
                            <span> {nom} </span>
                            <span> @{username} </span>
                        </div>
                        <div className="message-container">
                            <span>{dateN}</span>
                            <p>{email}</p>
                        </div>

                    </div>
                    </div>]
                }) : setResult([ <div style={{paddingTop: "20px", display: "grid" , placeItems: "center"}}> <b>"No result"</b> </div> ])
            setLoad("",'')
        })
    }

    const getResultMessage = (type) => {
        setLoad('load','')
        axios.get('/messages', {params:{
            id: "",
            request: "",
            filtre: "",
            mur: '',
            search: search,
        }, data:{}
        })
        .then(res => { 
            res.data.code === undefined ?
                // console.log(res.data.result.map(value => JSON.parse(value))):console.log(res.data.mess)
                setResult( () =>{
                    const tmp = type==="Trend"?
                                    res.data.result
                                        .map((value) => JSON.parse(value))
                                        .sort((a, b) => b.like.length - a.like.length):
                                    res.data.result
                                        .map((value) => JSON.parse(value)) // eslint-disable-next-line
                                        .filter((value) => {if(value.imgUrl!=="") return value})
                    return res.data.result.length!==0?
                    tmp.map(val => {
                        return <MessageContainer
                            key={val._id.$oid}
                            prenom={val.name}
                            id={id}
                            id_author={val.id_author}
                            idMsg={val._id.$oid}
                            date={moment(val.date.$date).format('YYYY/MM/DD')}
                            text={val.text}
                            avatar={val.avatar}
                            image={val.imgUrl}
                            comment={val.comment}
                            like={val.like}
                            timeOut={timeOut}
                            setUser={setUser}
                            setActive={setActive}
                            setIdMsg={setIdMsg}
                            rmMsg={rmMsg}
                            setLoad={setLoad}
                            />
                    }): [ <div style={{paddingTop: "20px", display: "grid" , placeItems: "center"}}> <b>"No result"</b> </div> ]
                }
                ):alert(res.data.code+ ": "+ res.data.mess)
            })
        setLoad('','')
    }


    const changeTab = (e, type) => {
        setTab(type)
        setResult([])
        if (search!=="") getResult(e, type)
    }

    useEffect(() => {
        if(click)
            getResultMessage("Trend")// eslint-disable-next-line
    }, [])


    return (
        <div className="mainPage">
            <div className="search__header">
                <div className="searchbar">
                    <form onSubmit={e => getResult(e, tab)}>
                        <Search onClick={e => getResult(e, tab)}/>
                        <input 
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Birdy"
                        />
                    </form>
                </div>
            </div>

            <div className="tab">
                <span className={"tab-name "+(tab==="Trend"?"active":"")} onClick={(e)=> changeTab(e, "Trend")}><b>Trend</b></span>
                <span className={"tab-name "+(tab==="User"?"active":"")} onClick={(e)=> changeTab(e, "User")}><b>User</b></span>
                <span className={"tab-name "+(tab==="Picture"?"active":"")} onClick={(e)=> changeTab(e, "Picture")}><b>Picture</b></span>
            </div>

            <div className="main__messages">
                {search.length!==0? result:
                    <div style={{paddingTop: "20px", display: "grid" , placeItems: "center"}}> <b>Insert keyword on the searchbar</b> </div>}
            </div>
        </div>
    )
}

export default SearchPage
