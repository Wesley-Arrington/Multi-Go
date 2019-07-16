import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditGame from './edit_game/edit_game'
import LobbyPlayers from './lobby_players/lobby_players'

export default class Lobby extends Component {

    render() {
        return (
            <div className="simple-column-x-center-center-y">
                <div className="simple-row-space-between">
                    <EditGame />
                    <LobbyPlayers />
                </div>
                <Link to="/game">
                    <button className="blue-button">Start Game</button>
                </Link>
            </div>
        )
    }
}
