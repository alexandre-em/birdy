import React, { Component } from 'react'
import moment from 'moment'
import { IconButton } from '@material-ui/core'
import { Reply } from '@material-ui/icons'

export class ReplyCtn extends Component {
    render() {
        var rps = JSON.parse(this.props.rep)
        return (
            <div className="rep-rep">
                <div className="rep-ctn">
                    {rps.text}
                </div>
                <div className="rep-btn">
                    <IconButton onClick={() => {this.props.rf(rps._id.$oid)}}>
                        <Reply />
                    </IconButton>
                </div>
                <div className="rep-aut" onClick={() => this.props.profS(rps.id_author)}>
                    @{rps.id_author}
                </div>
                <div className="rep-date">
                    {moment(rps.date.$date).format('YYYY-MM-DD H:mm:ss')}
                </div>
            </div>
        )
    }
}

export default ReplyCtn
