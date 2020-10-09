import React from 'react'
import Follower from './Follower'

function ListeFollow({ id , follow, timeOut, setActive, setUser, rmFriend }) {
    const followL = follow.map((idUser, i) => {
        return <Follower
            key={idUser+i}
            id={id}
            follow={idUser}
            setActive={setActive}
            setUser={setUser}
            timeOut={timeOut}
            followed={ follow.includes(idUser)}
            rmFriend={rmFriend}
        />
    })
    return (
        <div className="main__message">
            {followL}
        </div>
    )
}

export default ListeFollow
