import React, { Component } from 'react'
import './lobby.css'
import LobbyRow from './lobby_row'

export default class LobbyRows extends Component {
    render() {
        let rows = this.props.games.map(game =>  {
            return <LobbyRow playerCount={game.player_ids.length}/>
        })

        return (
            <div className="width-100">
                {rows}
            </div>
        )
    }
}
