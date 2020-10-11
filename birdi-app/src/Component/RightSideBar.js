import { Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './css/rightSide.css'
import axios from './axios'

function RightSideBar({ active, user,setUser, id, setActive, setLoad, search, setSearch, setclick }) {

    const [pic, setPic] = useState([])

    const getMur = async () => {
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
                // eslint-disable-next-line
                setPic(JSON.parse(res.data.id).map((value, i) => {
                    var cpt = 0;
                    if(value.imgUrl!=="" && (cpt<7)){
                        cpt++
                        return <img key={value._id.$oid} src={value.imgUrl} alt="" onClick={() => setLoad("img", value.imgUrl)}/>
                    }
                })):alert(res.data.code+ ": "+ res.data.mess)
        })
        .catch(err => alert(err))
    }

    const checkUser = (e) => {
        e.preventDefault()
        setclick(true)
        setActive('Search')
    }

    useEffect(() => {
        if(active==="Profile") getMur()
        // eslint-disable-next-line
    }, [user])

    return ( 
        <div className="rightSideBar">
            <div className={"searchbar "+(active==="Search"?"hide":"")}>
                <form onSubmit={checkUser}>
                    <Search />
                    <input 
                        type="text"
                        placeholder="Search Birdy"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
            {active==="Profile"?<h3>{user}'s images</h3>:""}
            <div className={"side__images "+(active==="Profile"?"":"hide")}>
                {pic}
            </div>
        </div>
    )
}

export default RightSideBar
