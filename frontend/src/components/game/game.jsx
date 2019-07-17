import React, { Component } from 'react'
import GameBoardContainer from './game_board/gameBoard_Container'
import Players from './players/players'
import ChatBoxContainer from '../chat_box/chat_box_container'
import './game.css'

import Board from './GameLogic/board';

// KC: I think when we click Start Game, we want to initialize a new Game from the GameLogic directory
// KC: Then, persist the new Game into the DB.

class Game extends Component {

    constructor(props) {
        super(props);
        // should be able to take players and size from a user form
    }

    componentDidMount() {
        // Once Start Game button is clicked, we are creating a post request for a new Game. 

        let data = {
            player_ids: ["1", "2"], 
            grid: [{
                xCoord: 0,
                yCoord: 0,
                color: "R"
                }], 
            turn: "0"}

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

        if (typeof this.props.game_id.game_id !== "string") return null;

        return (
            <div className="game-div">
                <GameBoardContainer game_id={this.props.game_id.game_id}/>
                <div>
                    <Players />
                    <ChatBoxContainer />
                </div>
            </div>
        )
    }
}

export default Game;