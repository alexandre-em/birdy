import React from 'react'
import { Home, Search, Person, GitHub, ExitToApp, Notifications, NotificationsActive, Brightness4 } from '@material-ui/icons'
import './css/leftSide.css'
// import { IconButton } from '@material-ui/core'

function LeftSideBar({ active, setActive, id, logout, setUser, setHide, setTheme, theme,notif }) {
    const logoB = "https://img.icons8.com/ios-filled/100/000000/crow.png"

    const seeProf = () => {
        setActive("Profile"); 
        setUser(id)
        setHide(true)
    }

    const handleClick = (menu) => {
        setActive(menu)
        setHide(true)
    }

    return (
        <div className="leftSideBar">
            <div className={`title ${theme?"":"dark"}`}>
                <img className="logo" src={logoB} alt="" width="50px" height="50px" onClick={() => setActive('Home')}/>
                <span>バーディー</span>
            </div>
            <div className={"left__menu-item "+(active==="Home"? "active":"")}
                onClick={() => handleClick("Home")}
                >
                <Home fontSize="large"/>
                <div className="left__menu-name">
                    <h4>Home</h4>
                </div>
            </div>
            <div className={"left__menu-item "+(active==="Search"? "active":"")}
                onClick={() => handleClick("Search")}
                >
                <Search fontSize="large"/>
                <div className="left__menu-name">
                    <h4>Search</h4>
                </div>
            </div>
            <div className={"left__menu-item "+(active==="Notification"? "active":"")}
                onClick={() => handleClick("Notification")}
                >
                {notif.length === 0? <Notifications fontSize="large"/>:<NotificationsActive fontSize="large" style={{ color: "rgb(0, 162, 255)" }} />}
                <div className="left__menu-name">
                    <h4>Notification</h4>
                </div>
            </div>
            <div className={"left__menu-item "+(active==="Profile"? "active":"")}
                onClick={seeProf}>
                <Person fontSize="large"/>
                <div className="left__menu-name">
                    <h4>Profile</h4>
                </div>
            </div>
            <div className={"left__menu-item theme"}
                onClick={() => setTheme(!theme)}>
                <Brightness4 fontSize="large"/>
                <div className="left__menu-name">
                    <h4>{theme?"Dark Mode":"Light Mode"}</h4>
                </div>
            </div>
            <a href="https://gitlab.com/alexandre_em/birdi" target="_blank" rel="noreferrer noopener">
                <div className="left__menu-item git">
                    <GitHub fontSize="large"/>
                    <div className="left__menu-name">
                        <h4>Source</h4>
                    </div>
                </div>
            </a>
            {/* <div className="btn__mob">
                <Create fontSize="small"/>
            </div>
            <div className="tweet__btn">
                <span><Create fontSize="small"/> Post</span>
            </div> */}
            <div className="btn__mob logout" onClick={logout}>
                <ExitToApp fontSize="small"/>
            </div>

            <div className="tweet__btn logout" onClick={logout}>
                <span><ExitToApp fontSize="small"/> <b>Logout</b></span>
            </div>
        </div>
    )
}

export default LeftSideBar
