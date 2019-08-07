import React, { Component } from 'react'
import './lobby.css'
import LobbyRow from './lobby_row'

export default class LobbyRows extends Component {
    render() {
        // debugger;
        // if (typeof this.props.games === "object") return null;
        
        let rows = this.props.games.map(game =>  {
            // debugger;
            if (typeof game.player_ids === "object") {
                return (<LobbyRow playerCount={game.player_ids.length}/>)
            }
        })

        

        return (
            <div className="width-100-column-reverse">
                {rows}
            </div>
        )
    }
}
