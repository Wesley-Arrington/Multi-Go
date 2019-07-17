import React, { Component } from 'react';
import GameBoardButtonContainer from './gameBoardButton_Container'

class GameBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {};
        // this.createButtons = this.createButtons.bind(this)
    }

    componentDidMount() {
        this.props.getGame(this.props.game_id)
            // .then( res => this.setState({game: res }));
    }

    createButtons() {        
        let buttons = []

        this.props.game.grid.forEach((point, idx) => {
            buttons.push(<GameBoardButtonContainer row={point.xCoord} col={point.yCoord} color={point.color} />)
        })
        
        return buttons
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