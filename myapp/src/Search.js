import React, {Component} from 'react'

class Search extends Component {
    constructor(){
        super()
        this.state = {
            filtre : "",
            search: "",
        }
    }

    changeFiltre = (event) => {
        this.setState({filtre : event.target.value})
    }

    handleSubmit = () => {
        switch(this.state.filtre){
            case 'message':
                console.log("En Construction")
                break
            default:
                this.props.profS(this.state.search)
                break
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return <div className="search">
                <input type="search" name="search" onChange={this.handleChange} placeholder="Rechercher"/>
                <select name="search" id="search" onChange={(event) => this.changeFiltre(event)}>
                    <option value="idUser">id user</option>
                    <option value="message">Message</option>
                </select>
                <button onClick={this.handleSubmit}>Search</button>
            </div>
    }
}

export default Search