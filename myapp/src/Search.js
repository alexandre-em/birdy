import React, {Component} from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'

class Search extends Component {
    
    constructor(){
        super()
        this.state = {
            filtre : "idUser",
            search: "",
        }
    }

    changeFiltre = (event) => {
        this.setState({filtre : event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        switch(this.state.filtre){
            case 'message':
                alert("En Construction")
                break
            default:
                this.props.profS(this.state.search)
                break
        }
        this.setState({search: ""})
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return <div className="search">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <TextField id="outlined-search" name="search" label="Search field" type="search" variant="outlined" value={this.state.search} onKeyDown={e => {if (e.key === 'Enter') {
            this.handleSubmit(e)}}} onChange={this.handleChange}/>
                    <FormControl variant="outlined" >
                        <InputLabel id="demo-simple-select-outlined-label">Filtre</InputLabel>
                        <Select
                            id="search"
                            value={this.state.filtre}
                            onChange={(event) => this.changeFiltre(event)}
                            label="Filtre"
                            >
                            <MenuItem value="idUser">id user</MenuItem>
                            <MenuItem value="message">Message</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </div>
    }
}

export default Search