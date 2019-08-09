import React, { Component } from 'react';
import GameBoardContainer from './game_board/gameBoard_Container';
import PlayersContainer from './players/players_container';
import ChatBoxContainer from '../chat_box/chat_box_container';

import './game.css';
import NavBar from '../nav_bar/nav_bar';

class Game extends Component {

    render() {

        // if (typeof this.props.game_id.game_id !== "string") return null;

        return (
            <div>
                <NavBar />
                <div className="game-div">
                    {/* game_id={this.props.game.game_id} */}
                    <GameBoardContainer/>
                    <div>
                        <PlayersContainer players={this.props.game.player_ids}/>
                        <ChatBoxContainer />
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;