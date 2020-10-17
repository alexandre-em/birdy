import React, { useEffect, useState } from 'react'
import {db} from './firebase'
import NElem from './NElem'

function Notif({id, setActive, setUser, setIdMsg, notif}) {
    const [list, setList] = useState([])

    useEffect(() => {
        setList(notif.map((value) => {
            return <NElem key={value.idMsg} data={value} setActive={setActive} setUser={setUser} setIdMsg={setIdMsg} id={id} toDelete={toDelete}/>
        }))
        //  eslint-disable-next-line
    }, [setList])

    const toDelete = (data) => {
        db.collection("notifications")
        .doc(id)
        .collection("reply")
        .where("idMsg", "==", data.idMsg)
        .where("message" ,"==", data.message)
        .where("author","==", data.author)
        .where("timestamp","==", data.timestamp)
        .get()
        .then(query =>{
            query.docs[0].ref.delete()
        })
        // eslint-disable-next-line
        setList(notif.map(elt => {
            if(elt !== data) 
                return <NElem key={elt.idMsg} data={elt} setActive={setActive} setUser={setUser} setIdMsg={setIdMsg} id={id} toDelete={toDelete}/>
        }))
    }

    return (
        <div className="mainPage">
            <div className="main__header rep">
                <h3>Notification </h3>
            </div>
            <div className="main__messages">
                {list.length!==0? list : <div style={{paddingTop: "20px", display: "grid" , placeItems: "center"}}> <b>No notification</b> </div>}
            </div>
        </div>
    )
}

export default Notif
