import React, { Component } from 'react';
import Game from '../GameLogic/game';
import { NONAME } from 'dns';

export default class GameBoardButton extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // console.log("row:")
        // console.log(this.props.row)
        // console.log("column:")
        // console.log(this.props.col)
        // console.log("")
        // console.log(this.props.color)
      
        // game logic here 
        let g = new Game(this.props.grid, 3)
        // if valid move, then make changes to grid and persist to DB.
        // if invalid move, do nothing.
        if (g.placeStone(this.props.row, this.props.col, this.activeColor(parseInt(this.props.turn))) === true) {
            // result from the game logic file
            let grid = g.grid.flat().map((point) => {

                return {
                    xCoord: point.position[0],
                    yCoord: point.position[1],
                    color: point.color
                }
            })

            let newTurn = (parseInt(this.props.turn) + 1) % this.props.player_ids.length;

            let dummyData = {
                player_ids: this.props.player_ids,
                grid: grid,
                // turn: this.props.turn
                turn: "" + newTurn
            }

            this.props.makeMove(this.props.game_id, dummyData);
            this.props.handleClick();
        }
    }

    newColor(pointColor) {
         let color;
        switch (pointColor) {
            case "R":
                color = "red";
                break
            case "G":
                color = "green";
                break
            case "B":
                color = "blue";
                break
            case "W":
                color = "white";
                break
            case "Bl":
                color = "black";
                break
            case "empty":
                color = 'black';
                break
            default:
                color = "";
        }   

        return color;

        // kc: it's a bit tirckier than i thought.
        // kc: we do not want to use state b/c in the case where there is a capture, 
        // kc: the captured stones do not reflect the correct css settings. 

        // this.setState(color) {
        //     bg-color: color
        // }

    }

    activeColor(turnColor) {
        // assume player 1, 2, 3 is R, G, B
        switch(turnColor) {
            case 0:
                return "R";
            case 1:
                return "G";
            case 2: 
                return "B";
        }
    }

    render() {
        // console.log(this.props.color);
        // console.log(this.newColor(this.props.color));

        let containerStyle;

        switch(this.props.color) {
            case 'empty':
                containerStyle = {
                    opacity: 0
                    // visibility: 'hidden'
                    // display: 'none'
                };
                break;
            default:
                containerStyle = {
                    backgroundColor: this.newColor(this.props.color)
                }
        }

        return (
            <div>
                <div onClick={this.handleClick} className={"game-div-clickable-board-go-piece"} style={containerStyle} ></div>
            </div>
        )
    }
}

