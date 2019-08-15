import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import LobbyRowsContainer from './lobby_rows/lobby_rows_container'
import io from 'socket.io-client';

import './splash.css';

export default class Splash extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '2',
            players: new Array(2)
        }

        this.handleClick = this.handleClick.bind(this);
        this.demoGame = this.demoGame.bind(this);
    }

    handleClick() {
        this.props.openModal('gameSettings');
        // kc: set sessionStorage.game to empty {}
        sessionStorage.setItem("game", JSON.stringify(
            {}
        ))
    }

    demoGame() {
        let players = this.state.players

        players[0] = this.props.session.user.email;
        players[1] = "Computer"

        let data = {
            name: "DEMO",
            players: players,
            size: 13,
            turn: 0
        }

        sessionStorage.setItem("game", JSON.stringify(
            {}
        ))

        this.props.newGame(data).then((game) => {
            return this.props.history.push(`/game/${game.game._id}/`)
        });
    }

    componentDidMount() {
        // compoenentDidMount runs once after render
        this.props.getValidGames();
        
        const socket = io('https://multi-go.herokuapp.com');

        // kc: there are 2 places where this receives emits.
        // whenever a user creates a game (non demo) & joins a game
        socket.on("reloadIdxPage", (data) => {
            this.props.getValidGames();
        });
    }

    render() {

        if (this.props.session.isAuthenticated) {
        return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                    <button onClick={this.handleClick} className="blue-button" id="splash-page-create-lobby-button">Create Game</button>
                    <button onClick={this.demoGame} className="blue-button" >Demo Single Player Game</button>
                </div>
                <LobbyRowsContainer />
            </div>
        )
        } else {
            return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                        <button onClick={() => this.props.openModal('login')} className="blue-button" id="splash-page-create-lobby-button">Create Game</button>
                </div>
                <LobbyRowsContainer />
            </div>
            )
        }
    }
}
