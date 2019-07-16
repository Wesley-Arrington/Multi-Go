import React, { Component } from 'react'

export default class GameBoardButton extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
  
        let color;

        switch (this.props.color) {
            case "R":
                color = "red";
                break
            case "W":
                color = "white";
                break
            case "B":
                color = "black";
                break
            default:
                color = "";
        }
        this.state = {
            bgColor: color
        }

    }

    handleClick() {
        console.log("row:")
        console.log(this.props.row)
        console.log("column:")
        console.log(this.props.col)
        console.log("")
        console.log(this.props.color)

        // handle click should trigger a patch request to change background color of point.
        this.setState({
            // just placeholder for testing
            bgColor: "blue"
            // Set this to current player color
            // should trigger a patch AXIOS request to backend
        })


    }

    render() {

        return (
            <div>
                <div style={{backgroundColor: this.state.bgColor}} onClick={this.handleClick} className={"game-div-clickable-board-go-piece"}></div>
            </div>
        )
    }
}

