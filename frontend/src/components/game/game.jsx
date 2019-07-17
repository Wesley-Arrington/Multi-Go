import React, { Component } from 'react'
import GameBoardContainer from './game_board/gameBoard_Container'
import Players from './players/players'
import ChatBoxContainer from '../chat_box/chat_box_container'
import './game.css'

// KC: I think when we click Start Game, we want to initialize a new Game from the GameLogic directory
// KC: Then, persist the new Game into the DB.

class Game extends Component {

    // constructor(props) {
    //     super(props);
        // should be able to take players and size from a user form
    // }

    // componentDidMount() {
    // }

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