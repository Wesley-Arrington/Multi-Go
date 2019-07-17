import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import LobbyRows from './lobby_rows/lobby_rows'
import './splash.css';
import Board from '../game/GameLogic/board';

export default class Splash extends Component {

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let data = {
            player_ids: ["1", "2", "3"],
            grid: [{
                xCoord: 0,
                yCoord: 0,
                color: "R"
            }],
            turn: "0"
        }

        // the parameters of players and board size should come from a user form
        // see Wez
        let b = new Board;

        // flatten array and transform data
        let subData = b.grid.flat().map(point => {
            return { xCoord: point.position[0], yCoord: point.position[1], color: point.color }
        })

        data.grid = subData;

        this.props.newGame(data);
    }

    render() {
        let { isLoggedIn } = this.props
        if (isLoggedIn) {
        return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                    <Link to="/lobby">
                    <button onClick={this.handleClick} className="blue-button" id="splash-page-create-lobby-button">Create Lobby</button>
                    </Link>
                </div>
                <LobbyRows />
            </div>
        )
        } else {
            return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                    {/* <button onClick={this.handleClick} className="blue-button" id="splash-page-create-lobby-button">Create Lobby</button> */}
                </div>
                <LobbyRows />
            </div>
            )
        }
    }
}
