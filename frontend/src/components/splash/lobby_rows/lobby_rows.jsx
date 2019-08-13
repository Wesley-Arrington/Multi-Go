import React, { Component } from 'react'
import './lobby.css'
import LobbyRowContainer from './lobby_row_container'

export default class LobbyRows extends Component {
    render() {
        // if (typeof this.props.games === "object") return null;
        let rows = Object.values(this.props.games).map((game,idx) =>  {
            if (typeof game !== "undefined" && typeof game.player_ids === "object") {
                return (<LobbyRowContainer idx={idx} playerCount={game.player_ids.length}/>)
            }
        })

        return (
            <div className="width-100-column-reverse">
                {rows}
            </div>
        )
    }
}
