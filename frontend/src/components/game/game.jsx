import React, { Component } from 'react';
import GameBoardContainer from './game_board/gameBoard_Container';
import PlayersContainer from './players/players_container';
import ChatBoxContainer from '../chat_box/chat_box_container';

import './game.css';
import NavBar from '../nav_bar/nav_bar';

class Game extends Component {

    render() {

        // if (typeof this.props.game_id.game_id !== "string") return null;
        let style = {
            margin: "30px",
            width: "950px"
        }
        // KC: for Demo, 
        return (
            <div>
                <NavBar />
                <div className="game-div-content-container">
                    <div className="game-div">
                        <GameBoardContainer/>
                    </div>
                    
                    <div className="game-right-side-container">
                        <PlayersContainer />
                        <div className="chat-box-container-div">
                            <ChatBoxContainer />
                        </div>
                    </div>
                </div>

                <div style={style}>
                    <h4>The classical game of Go originated a long time ago in China. It is a turn-based game where each player places a stone of their color on
                        an intersection. The game is over when when all players agree to end the game. The winner is decided by the player with the most stones of their color on the board.
                    </h4>

                    <br />

                    <h4>
                        In the demo game, the board is 13x13 with 2 players. Thus, the board has 169 points. The winner with more than half the board,
                        or 85 points, wins the game.
                    </h4>
                    
                    <br/>

                    <h4>
                        Go, despite having a reputation of being a complicated game, has only one rule: Capture.
                        A player can capture opposing player's stones if the opposing player's stones have no liberties. 
                        A stone or group of stones have a property called "liberty". Liberty is the count of neighboring connected points that are empty. 
                    </h4>                        
                        
                    <br />  

                    <h4>
                        That's it! Have fun playing Go!
                    </h4>
                </div>
            </div>
        )
    }
}

export default Game;