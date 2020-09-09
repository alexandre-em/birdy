import React, {Component} from 'react'
import SearchIcon from "@material-ui/icons/Search"
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

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
                <FormControl variant="outlined" className="search">
                    <InputLabel id="demo-simple-select-outlined-label">Filtre</InputLabel>
                    <Select
                        id="search"
                        onChange={(event) => this.changeFiltre(event)}
                        label="Age"
                        >
                        <MenuItem value="idUser">id user</MenuItem>
                        <MenuItem value="message">Message</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="outlined"
                    color="default"
                    onClick={this.handleSubmit}
                    startIcon={<SearchIcon />}
                />
            </div>
    }
}

export default Search