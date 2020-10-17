import React, { useState } from 'react';
import './css/App.css';
import LeftSide from './LeftSideBar';
import Login from './Login';
import PageSelect from './PageSelect';
import RightSide from './RightSideBar'
import axios from './axios'
import Signup from './Signup';
import Modal from './Modal';
import { useEffect } from 'react';
import { db } from './firebase'

function App() {
  const [active, setActive] = useState("Home")
  const [id, setId] = useState(localStorage.getItem('id') || '')
  const [user, setUser] = useState("")
  const [hide, setHide] = useState(true)
  const [load, setLoad] = useState("")
  const [img, setImg] = useState("")
  const [search, setSearch] = useState("")
  const [click, setclick] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme')==="true")

  const [notif, setNotif] = useState([])

  const timeOut = () => {
    console.log("time out")
    logout()
  }
  const logout = () => {
    axios.delete('/login?login='+id)
    .then(alert("Disconnected."))
    changeId("")
  }

  const changeId = (idU) => {
    setId(idU)
    localStorage.setItem("id", idU)
  }

  const callModal = (opt, img) => {
    setLoad(opt)
    setImg(img)
  }

  useEffect(() => {
    if (id!==""){
      db.collection('notifications')
        .doc(id)
        .collection('reply')
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setNotif(snapshot.docs.map((doc) => doc.data())))
    }
  }, [id])

  useEffect( () => {
    if(!theme){
      changeTheme(theme)
    }
  }, [])

  const changeTheme = (bool) => {
    setTheme(bool)
    localStorage.setItem("theme", bool)
    document.body.classList.toggle('dark')
  }

  switch(id){
    case "":
      return (
        <div>
          <Modal load={load} img={img} setLoad={setLoad}/>
          <Login theme={theme} setId={changeId} setLoad={setLoad}/>
        </div>
      )
    case "new":
        return <div>
          <Modal load={load} setLoad={setLoad}/>
          <Signup theme={theme} setId={changeId} setLoad={setLoad}/>
        </div> 
    default:
      return (
        <div>
          <Modal load={load} img={img} setLoad={setLoad}/>
          <div className="menu-port">
              <div className={"menu-hamb"} onClick={() => setHide(!hide)}>
                <div></div>
                <div></div>
                <div></div> 
              </div>
              <div className="menu-port-title">
                <span>バーディー</span>
              </div>
            </div>
          <div className="App">
            <div className={"left "+(hide?"hide":"")}>
              <LeftSide active={active} setActive={setActive} theme={theme} setTheme={changeTheme} setHide={setHide} setUser={setUser} id={id} logout={logout} notif={notif}/>
            </div>
            <PageSelect active={active} setActive={setActive} id={id} user={user} setUser={setUser} timeOut={timeOut} load={load} setLoad={callModal} search={search} setSearch={setSearch} setclick={setclick} click={click} notif={notif}/>
            <RightSide active={active} setActive={setActive} user={user} setUser={setUser} id={id} setLoad={callModal} search={search} setSearch={setSearch} setclick={setclick}/>
          </div>
        </div>
      );
  }
}

export default App;
