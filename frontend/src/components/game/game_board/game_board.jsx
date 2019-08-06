import React, { Component } from 'react';
import GameBoardButtonContainer from './gameBoardButton_Container';
import io from 'socket.io-client';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        // this.handleClick = this.handleClick.bind(this);
        // this.createButtons = this.createButtons.bind(this)
    }

    createButtons() {        
        let buttons = []

        this.props.game.grid.forEach((point, idx) => {
            buttons.push(<GameBoardButtonContainer handleClick={this.handleClick} row={point.xCoord} col={point.yCoord} color={point.color} />)
        })
        
        return buttons
    }

    handleClick() {
            const socket = io('http://localhost:5000');
            socket.emit("sendingMove", { message: "moved" });
    }

    componentDidMount() {
        const socket = io('http://localhost:5000');
        socket.on("receiveMove", (data) => {
            console.log("received move")
            this.props.getGame(this.props.game_id);
        })

        this.props.getGame(this.props.game_id);
    }

    render() {
        if (this.props.game.grid === undefined) return null;
        
        let buttons = this.createButtons();

        return (
            <div className="game-div-game-board">
                <div className="game-section">
                    <div className="game-div-clickable-board" >
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }
}

export default GameBoard;