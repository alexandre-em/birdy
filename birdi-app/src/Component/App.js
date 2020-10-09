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

  switch(id){
    case "":
      return (
        <Login setId={changeId} />
      )
    case "new":
        return <div>
          <Modal load={load}/>
          <Signup setId={changeId} setLoad={setLoad}/>
        </div> 
    default:
      return (
        <div className="">
          <Modal load={load}/>
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
            <PageSelect active={active} setActive={setActive} id={id} user={user} setUser={setUser} timeOut={timeOut} load={load} setLoad={setLoad} />
            <RightSide active={active} setActive={setActive} user={user} setUser={setUser} id={id}/>
          </div>
        </div>
      );
  }
}

export default App;
