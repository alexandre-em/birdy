import React, { useState } from 'react';
import './css/App.css';
import LeftSide from './LeftSideBar';
import Login from './Login';
import PageSelect from './PageSelect';
import RightSide from './RightSideBar'
import axios from './axios'
import Signup from './Signup';
import Modal from './Modal';

function App() {
  const [active, setActive] = useState("Home")
  const [id, setId] = useState(localStorage.getItem('id') || '')
  const [user, setUser] = useState("")
  const [hide, setHide] = useState(true)
  const [load, setLoad] = useState("")
  const [img, setImg] = useState("")
  const [search, setSearch] = useState("")
  const [click, setclick] = useState(false)


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

  switch(id){
    case "":
      return (
        <div>
          <Modal load={load} img={img} setLoad={setLoad}/>
          <Login setId={changeId} setLoad={setLoad}/>
        </div>
      )
    case "new":
        return <div>
          <Modal load={load} setLoad={setLoad}/>
          <Signup setId={changeId} setLoad={setLoad}/>
        </div> 
    default:
      return (
        <div className="">
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
              <LeftSide active={active} setActive={setActive} setHide={setHide} setUser={setUser} id={id} logout={logout}/>
            </div>
            <PageSelect active={active} setActive={setActive} id={id} user={user} setUser={setUser} timeOut={timeOut} load={load} setLoad={callModal} search={search} setSearch={setSearch} setclick={setclick} click={click}/>
            <RightSide active={active} setActive={setActive} user={user} setUser={setUser} id={id} setLoad={callModal} search={search} setSearch={setSearch} setclick={setclick}/>
          </div>
        </div>
      );
  }
}

export default App;
