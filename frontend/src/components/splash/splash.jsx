import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import LobbyRowsContainer from './lobby_rows/lobby_rows_container'
import './splash.css';
import Board from '../game/GameLogic/board';

export default class Splash extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // the parameters of players and board size should come from a user form
        // see Wez

        // KC: commented out for now in order to develop canvas grid

        // let b = new Board;

        // // kc: this is where we manually set the # of players until we fix things later.
        let data = {
            player_ids: [this.props.currentUser.email],
            // grid: [{
            //     xCoord: 0,
            //     yCoord: 0,
            //     color: "R"
            // }],
            turn: "0"
        }

        // // flatten array and transform data
        // let subData = b.grid.flat().map(point => {
        //     return { xCoord: point.position[0], yCoord: point.position[1], color: point.color }
        // })


        // data.grid = subData;

        // this.props.newGame(data);

        this.props.newGame(data).then((game) => this.props.history.push(`/lobby/${game.game_id}/`));
    }

    componentDidMount() {
        // debugger;
        this.props.getValidGames();
    }

    render() {
        let { isLoggedIn } = this.props
        // debugger;
        // let currentGame = this.store.getState().entities;
        if (isLoggedIn) {
        return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                    <button onClick={this.handleClick} className="blue-button" id="splash-page-create-lobby-button">Create Lobby</button>
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
                        <button onClick={() => this.props.openModal('login')} className="blue-button" id="splash-page-create-lobby-button">Create Lobby</button>
                </div>
                <LobbyRowsContainer />
            </div>
            )
        }
    }
}
