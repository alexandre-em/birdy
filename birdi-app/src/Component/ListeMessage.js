import React from 'react'
import MessageContainer from './Message'
import moment from 'moment'

function ListeMessage({ id, mur, timeOut, setUser, setActive, rmMsg, setIdMsg, setLoad }) {
    const murPr = mur.sort((a, b) => b.date.$date - a.date.$date).map((val, i) => {
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
    })
    return (
        <div className="main__messages">
            {murPr}
        </div>
    )
}

export default ListeMessage
