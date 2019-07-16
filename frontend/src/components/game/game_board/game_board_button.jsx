import React, { Component } from 'react'

export default class GameBoardButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("row:")
        console.log(this.props.row)
        console.log("column:")
        console.log(this.props.col)
        console.log("");
        // KC: This is where we want to start the ajax request.

    }

    render() {
        return (
            <div>
                <div onClick={this.handleClick} className="game-div-clickable-board-go-piece"></div>
            </div>
        )
    }
}

