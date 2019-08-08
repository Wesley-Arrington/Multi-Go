import React, { Component } from 'react'
import './lobby.css'
import LobbyRowContainer from './lobby_row_container'

export default class LobbyRows extends Component {
    render() {
        // if (typeof this.props.games === "object") return null;
        
        let rows = this.props.games.map(game =>  {
            // debugger;
            if (typeof game.player_ids === "object") {
                return (<LobbyRowContainer playerCount={game.player_ids.length}/>)
            }
        })

        return (
            <div className="width-100-column-reverse">
                {rows}
            </div>
        )
    }
}
