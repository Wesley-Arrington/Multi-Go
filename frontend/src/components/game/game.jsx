import React, { Component } from 'react'
import GameBoard from './game_board/game_board'
import Players from './players/players'
import ChatBox from '../chat_box/chat_box'
import './game.css'

export default class Game extends Component {
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
