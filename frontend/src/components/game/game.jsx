import React, { Component } from 'react'
import GameBoard from './game_board/game_board'
import Players from './players/players'
import ChatBox from '../chat_box/chat_box'
import './game.css'

// KC: I think when we click Start Game, we want to initialize a new Game from the GameLogic directory
// KC: Then, persist the new Game into the DB.
// Multi - Go / frontend / src / components / game / game.jsx
// Multi - Go / Game Logic / board.js
// import * as GameLogic from '../../../../../Game Logic/board.js';


class Game extends Component {

    constructor(props) {
        super(props);
        // should be able to take players and size from a user form
        // this.game = new GameLogic.Board(3, 19);
    }

    componentDidMount() {
        // persist this to the DB
        debugger
        let data = {players: 2, size: 19}
        this.props.newGame(data);
    }

    render() {
        return (
            <div className="game-div">
                <GameBoard />
                <div>
                    <Players />
                    <ChatBox />
                </div>
            </div>
        )
    }
}

export default Game;