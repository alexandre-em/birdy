import React, { useEffect, useState } from 'react'
import './css/Profile.css'
import { Avatar } from '@material-ui/core'
import axios from './axios'
import ListeFollow from './ListeFollow'
import ListeFollower from './ListeFollower'
import ListeMessage from './ListeMessage'
import { ArrowBack } from '@material-ui/icons'

function Profile({ id, timeOut, user, setUser, setActive, load, setLoad, setIdMsg, idMsg }) {
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [dateN, setDateN] = useState("")
    const [email, setEmail] = useState("")
    const [avUrl, setAvUrl] = useState("")
    const [following, setFollowing] = useState([])
    const [follower, setFollower] = useState([])
    const [listeAM, setListeAM] = useState("message")

    const [bouton, setBouton] = useState(true)

    const [mur, setMur] = useState([])

    const setInfo = (nom, prenom, dateN, email, imgUrl) => {
        setNom(nom);
        setPrenom(prenom);
        setDateN(dateN);
        setEmail(email);
        setAvUrl(imgUrl)
    }

    const getInfoUser = () => {
        setLoad('load','')
        axios.get('/user', {params: {
            username: user,
        }, data:{}})
        .then(res => {
            var usr = res.data
            res.data.code === undefined ?
                setInfo(usr.nom, usr.prenom, usr.dateN, usr.email, usr.imgUrl) : alert(usr.code + ': ' + usr.mess)
            setLoad("",'')
        })
    }

    const getFollower = () => {
        setLoad('load','')
        axios.get('/friends', {params: {
            id: user,
            followed: '',
        }, data:{}})
        .then(res => {
            if (res.data.id) var usr = res.data.id.slice(1,-1)
            res.data.code === undefined ?
                (usr.length===0?setFollowing([]):setFollowing(usr.split(', '))) :
                console.log(res.data.code + ': ' + res.data.mess)
            setLoad("",'')
        })
    }

    const getFollowing =  () => {
        setLoad('load','')
        axios.get('/friends', {params: {
            id: '',
            followed: user,
        }, data:{}})
        .then(res => {
            if (res.data.id) var usr = res.data.id.slice(1,-1)
            res.data.code === undefined ?
                (usr.length===0?setFollower([]):setFollower(usr.split(', '))) :
                res.data.code === '456'?
                    setFollower([]):
                    console.log(res.data.code + ': ' + res.data.mess)
                setLoad("",'')
        })
    }

    const addFriend = async (usr) => {
        setLoad('load','')
        const formData = new URLSearchParams()
        formData.append('id', id)
        formData.append('ami', usr)
        axios.post('/friends', formData)
            .then( res => {
                res.data.code === undefined?
                    setFollowing([...following, usr]):
                    ((res.data.code === '458' || res.data.code === '504')?
                        timeOut() : alert(res.data.code + ': ' + res.data.mess))
                    setLoad("",'')
            })
    }

    const rmFriend = async (usr) => {
        setLoad('load','')
        axios.delete('/friends?id='+id+'&ami='+usr)
        .then(res => {
            res.data.code === undefined ?
                // eslint-disable-next-line
                setFollowing(following.filter((value) => {
                    if (value!==usr) return value
                })) :
                ((res.data.code === '458' || res.data.code === '504')?
                    timeOut() :
                    alert(res.data.code + ': ' + res.data.mess))
                setLoad("",'')
        })
    }

    const rmMsg = async (idMsg) => {
        setLoad('load','')
        axios.delete('/messages?idMessage='+idMsg+'&id='+id+'&idRep=')
            .then(res => {
                res.data.code !== undefined?
                    ((res.data.code === '458' || res.data.code === '504')?
                        timeOut():
                        alert(res.data.code+': '+res.data.mess))
                    :alert("Message deleted")
                setLoad("",'')
                })
    }

    const getMur = async () => {
        setLoad('load','')
        await axios.get('/messages', {params:{
            id: "",
            request: user,
            filtre: "id_author",
            mur: "",
            search: '',
        }, data:{}
        })
        .then(res => { 
            res.data !== undefined ?
                setMur(JSON.parse(res.data.id)):alert(res.data.code+ ": "+ res.data.mess)
            setLoad("",'')
        })
        .catch(err => alert(err))
    }

    const handleClick = (fct) => {
        fct(user)
        setBouton(!bouton)
    }

    useEffect(()=>{
        setBouton(!follower.includes(id))
    }, [follower, id])

    useEffect(() => {
        getInfoUser();
        getFollower();
        getMur();
        getFollowing();
        setBouton(!follower.includes(id))
        // eslint-disable-next-line
    }, [user])

    return (
        <div className="mainPage">
            <div className="main__header">
                <ArrowBack onClick={() => setActive("Home")} />
                <h3>{prenom}'s Profile</h3>
            </div>
            <div className="profile__banner" />
            <div className="profile__picture">
                <Avatar src={avUrl} />
                {(user!==id)?
                    ((bouton)?
                        <span className="btn-follow" onClick={() => handleClick(addFriend)}><b>Follow</b></span>:
                        <span className="btn-follow unfollow" onClick={() => handleClick(rmFriend)}><b>Unfollow</b></span>):
                    ""}
            </div>
            <div className="profile__details">
                <div className="details-name">
                    <h3>{prenom} {nom}</h3>
                    <span>@{user}</span>
                </div>
                <div className="details-pers">
                    <span>{email}</span>
                    <span><i>birthday: {dateN}</i></span>
                </div>
                <div className="details-follow">
                    <span onClick={() => setListeAM("message")}><b>{mur.length}</b> posts</span>
                    <span onClick={() => setListeAM("follow")}><b>{following.length}</b> following</span>
                    <span onClick={() => setListeAM("follower")}><b>{follower.length}</b> follower</span>
                </div>
            </div>
            
                {listeAM==="message"?<ListeMessage id={id} mur={mur} timeOut={timeOut} setActive={setActive} setUser={setUser} rmMsg={rmMsg} setLoad={setLoad} setIdMsg={setIdMsg}/>:""}
                {listeAM==="follow"?<ListeFollow id={id} follow={following} timeOut={timeOut}setActive={setActive} setUser={setUser} rmFriend={rmFriend}/>:""}
                {listeAM==="follower"?<ListeFollower id={id} follow={following} follower={follower} timeOut={timeOut}setActive={setActive} setUser={setUser} addFriend={addFriend} rmFriend={rmFriend}/>:""}
        </div>
    )
}

export default Profile
