import React, { Component } from 'react';
import Game from '../GameLogic/game';

export default class GameBoardButton extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
  
        let color;

        switch (this.props.color) {
            case "R":
                color = "red";
                break
            case "G":
                color = "green";
                break
            case "Blu":
                color = "blue";
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
        })

        // let g = new Game(this.props.grid)

        // insert game logic here 
        if (true) {
            // result from the game logic file
            let grid = this.props.grid.map((point) => {
                return {
                    xCoord: point.xCoord,
                    yCoord: point.yCoord,
                    color: point.color
                }
            })

               
            let newTurn = (parseInt(this.props.turn) + 1) % this.props.player_ids.length;

            let dummyData = {
                player_ids: this.props.player_ids,
                grid: this.props.grid,
                // turn: this.props.turn
                turn: "" + newTurn
   
            }

            this.props.makeMove(this.props.game_id, dummyData);
        }

    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: this.state.bgColor}} onClick={this.handleClick} className={"game-div-clickable-board-go-piece"}></div>
            </div>
        )
    }
}

