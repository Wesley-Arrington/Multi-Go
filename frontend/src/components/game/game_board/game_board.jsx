import React, { Component } from 'react'
import GameBoardButton from './game_board_button'

export default class GameBoard extends Component {

    // constructor(props) {
    //     super(props)

    //     // this.createButtons = this.createButtons.bind(this)
    // }

    createButtons() {

        let buttons = []
        for(let row = 0; row<19; row++) {
            for(let col=0; col<19; col++) {
                buttons.push(<GameBoardButton row={row} col={col} />)
            }
        }
        console.log(buttons)
        
        return buttons
    }

    render() {
        let buttons = this.createButtons();

        return (
            <div className="game-div-game-board">
                {/* <img src={"Blank_Go_Board.png"} alt="go-board" className="game-div-game-board-image"/> */}
                <div className="game-section">
                    <div className="game-div-clickable-board">
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }
}
