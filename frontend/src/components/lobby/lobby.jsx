import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditGame from './edit_game/edit_game'
import LobbyPlayers from './lobby_players/lobby_players'
import NavBar from '../nav_bar/nav_bar'

export default class Lobby extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let gameId = this.props.gameId;
        this.props.history.push(`/game/${gameId}`)
    }

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
                    <button onClick={this.handleClick} className="blue-button" id="lobby-start-game-button">Start Game</button>
                </div>
            </div>
        )
    }
}
