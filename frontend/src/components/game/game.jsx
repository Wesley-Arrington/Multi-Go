import React, { Component } from 'react'
import GameBoardContainer from './game_board/gameBoard_Container'
import PlayersContainer from './players/players_container'

import ChatBoxContainer from '../chat_box/chat_box_container'
import './game.css'

// import Players from './players/players'

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

        // if (typeof this.props.game_id.game_id !== "string") return null;

        return (
            <div className="game-div">
                {/* <SquareBoard size={19 - 1} game_id={this.props.game_id.game_id}/> */}
                <GameBoardContainer game_id={this.props.game.game_id}/>
                <div>
                    <PlayersContainer players={this.props.game.player_ids}/>

                    <ChatBoxContainer />
                </div>
            </div>
        )
    }
}

export default Game;