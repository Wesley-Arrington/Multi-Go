import React, { Component } from 'react'
import './lobby.css'
import LobbyRowContainer from './lobby_row_container'

export default class LobbyRows extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        if (Object.values(this.props.games).length === 0) return null;
        let rows = Object.values(this.props.games).map((game,idx) =>  {
            return (<LobbyRowContainer idx={idx}/>)
        });

        return (
            <div className="width-100-column-reverse">
                {rows}
            </div>
        )
    }
}
