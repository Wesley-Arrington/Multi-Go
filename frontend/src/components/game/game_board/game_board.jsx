import React, { Component } from 'react'
import GameBoardButton from './game_board_button'

class GameBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {};
        // this.createButtons = this.createButtons.bind(this)
    }

    componentDidMount() {
        // debugger
        this.props.getGame(this.props.game_id)
            // .then( res => this.setState({game: res }));

        // let buttons = []

        // this.props.points.forEach((point) => {
        //     buttons.push(<GameBoardButton row={point.xCoord} col={point.yCoord} color={point.color} />)
        // })

        // return buttons
    }

    createButtons() {

        let buttons = []
        // for(let row = 0; row<19; row++) {
        //     for(let col=0; col<19; col++) {
        //         buttons.push(<GameBoardButton row={row} col={col} color={this.props[0].color}/>)
        //     }
        // }

        this.props.game.grid.forEach((point) => {
            buttons.push(<GameBoardButton row={point.xCoord} col={point.yCoord} color={point.color} />)
        })

        console.log(buttons)
        
        return buttons
    }

    render() {
        console.log(this.props)
        debugger

        if (this.props.game.grid === undefined) return null;
        
        let buttons = this.createButtons();

        return (
            <div className="game-div-game-board">
                <div className="game-section">
                    <div className="game-div-clickable-board">
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }
}

export default GameBoard;