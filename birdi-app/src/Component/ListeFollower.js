import React from 'react'
import Follower from './Follower'
// import axios from './axios'

function ListeFollower({ id , follow , follower, timeOut, setActive, setUser, addFriend, rmFriend }) {
    // const [myFollow, setMyFollow] = useState([])

    // const getFollowing =  () => {
    //     axios.get('/friends', {params: {
    //         id: id,
    //         followed: '',
    //     }, data:{}})
    //     .then(res => {
    //         var usr = res.data
    //         res.data.code === undefined ?
    //             setMyFollow(usr.id.slice(1,-1).split(', ')) : alert(usr.code + ': ' + usr.mess)
    //     })
    // }

    // useEffect(() => {
    //     getFollowing();
    // })

    const followerL = follower.map((idUser, i) => {
        return <Follower 
            key={idUser+i}
            id={id}
            follow={idUser}
            setActive={setActive}
            setUser={setUser}
            timeOut={timeOut}
            followed={ follow.includes(idUser) }
            addFriend={addFriend}
            rmFriend={rmFriend}
        />
    })
    return (
        <div>
            {followerL}
        </div>
    )
}

export default ListeFollower
