import { Search } from '@material-ui/icons'
import React, { useState } from 'react'
import './css/SearchPage.css'
import MessageContainer from './Message'

function SearchPage() {
    const [tab, setTab] = useState("Trend")
    return (
        <div className="mainPage">
            <div className="search__header">
                <div className="searchbar">
                    <form >
                        <Search />
                        <input 
                            type="text"
                            placeholder="Search Birdy"
                        />
                    </form>
                </div>
            </div>

            <div className="tab">
                <span className={"tab-name "+(tab==="Trend"?"active":"")} onClick={()=> setTab("Trend")}><b>Trend</b></span>
                <span className={"tab-name "+(tab==="User"?"active":"")} onClick={()=> setTab("User")}><b>User</b></span>
                <span className={"tab-name "+(tab==="Picture"?"active":"")} onClick={()=> setTab("Picture")}><b>Picture</b></span>
            </div>

            <div className="main__messages">
                <MessageContainer prenom="Admin"
                    nom="EM"
                    id_author="em" 
                    date="2020/10/08"
                    text="This is a dummy message"
                    avatar="https://image.jimcdn.com/app/cms/image/transf/none/path/s83b320c7c139a4cc/image/i5f9abecc8b7d600f/version/1594692919/image.png"
                    image="https://image.jimcdn.com/app/cms/image/transf/none/path/s83b320c7c139a4cc/image/i5f9abecc8b7d600f/version/1594692919/image.png"
                    like={[]}
                    comment={[]}
                />
            </div>
        </div>
    )
}

export default SearchPage
