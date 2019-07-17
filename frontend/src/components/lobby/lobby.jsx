import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditGame from './edit_game/edit_game'
import LobbyPlayers from './lobby_players/lobby_players'
import NavBar from '../nav_bar/nav_bar'

export default class Lobby extends Component {

    render() {
        return (
            <div className="lobby-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title" id="lobby-multi-go-sub-title">Play Go variations with friends</h3>
                </div>
                <div className="lobby-page-content">
                    <div className="simple-row-space-between">
                        <EditGame />
                        <LobbyPlayers />
                    </div>
                    <Link to="/game">
                        <button className="blue-button" id="lobby-start-game-button">Start Game</button>
                    </Link>
                </div>
            </div>
        )
    }
}
