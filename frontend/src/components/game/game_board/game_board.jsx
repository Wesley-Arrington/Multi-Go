import React, { Component } from 'react';
import GameBoardButtonContainer from './gameBoardButton_Container';
import io from 'socket.io-client';
import Game from '../GameLogic/gameWebSocks';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.padding = 20;
        this.size = 19-1
        this.game = new Game(2,this.size+1)
    }

    componentDidMount() {
        // we can move this to game component and pass down ctx as props
        this.canvas1 = document.getElementById('canvas');
        this.ctx = this.canvas1.getContext('2d');

        const socket = io('http://localhost:5000');
        socket.on("receiveMove", (data) => {
            console.log("received move")
            console.log(data);
            this.game.placeStone(data.x, data.y, "black");
            this.ctx.clearRect(0,0,this.size*40+this.padding*2,this.size*40+this.padding*2)
            this.drawBoard();

            // this.props.getGame(this.props.game_id);
        })

        this.props.getGame(this.props.game_id);

        this.drawBoard();
        this.setupUI();
    }

    drawBoard() {
        // Box width
        let bw = this.size * 40 + 2 * this.padding;
        // Box height
        let bh = this.size * 40 + 2 * this.padding;

        // this.ctx.strokeStyle = "black";
        let x = 0;
        let y = 0;

        this.ctx.beginPath();

        for (let i = 0; i <= this.size; i++) {
            this.ctx.moveTo(x + this.padding, this.padding);
            this.ctx.lineTo(x + this.padding, bh - this.padding);
            this.ctx.stroke();
            x += 40
        }

        for (let i = 0; i <= this.size; i++) {
            this.ctx.moveTo(this.padding, y + this.padding);
            this.ctx.lineTo(bw - this.padding, y + this.padding);
            this.ctx.stroke();
            y += 40
        }

        // this.ctx.stroke();

        this.game.grid.forEach((row, idx1) => {
            row.forEach((point, idx2) => {
                if (point.color !== 'empty') {
                    this.drawCircle(idx1 * 40 + 20, idx2 * 40 + 20, point.color);
                }
            })
        }) 
    }

    setupUI() {
        this.canvas1.addEventListener("mousemove", event => {

            if (this.xCoord !== Math.floor(event.clientX / 40) || this.yCoord !== Math.floor(event.clientY / 40)) {
                // rerender Board;
                this.ctx.clearRect(0, 0, this.size * 40 + 2 * this.padding, this.size * 40 + 2 * this.padding)
                // const something = new Promise();
                this.drawBoard();
                // debugger
                //yellow circle
                // console.log(Math.floor(event.clientX/40))
                // console.log(Math.floor(event.clientY/40))
                this.drawCircle(Math.floor(event.clientX/40)*40+20, Math.floor(event.clientY/40)*40+20, "Yellow");
            }
            // debugger
            this.xCoord = Math.floor(event.clientX / 40)
            this.yCoord = Math.floor(event.clientY / 40)
        })

        this.canvas1.addEventListener("click", event => {
            let xCoord = Math.floor(event.clientX/40)
            let yCoord = Math.floor(event.clientY/40)
            this.game.placeStone(xCoord, yCoord, "black")
            
            this.ctx.clearRect(0, 0, this.size * 40 + 2 * this.padding, this.size * 40 + 2 * this.padding)
            this.drawBoard()

            const socket = io('http://localhost:5000');
            socket.emit("sendingMove", { message: "moved", x: xCoord, y: yCoord, color: "" });

            console.log(this.game)
        })
    }

    drawCircle(x, y, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 17, 0, 2 * Math.PI)
        this.ctx.fillStyle = color;
        this.ctx.fill();
        // this.ctx.stroke();
    }

    render() {
        // if (this.props.game.grid === undefined) return null;
        
        const background = {
            background: 'lightblue',
            height: this.size * 40 + 2 * this.padding,
            width: this.size * 40 + 2 * this.padding
        }

        return (
            <div style={background}>
                <canvas id="canvas" style={background} height={this.size * 40 + 2 * this.padding} width={this.size * 40 + 2 * this.padding}></canvas>
            </div>
        )
    }
}

export default GameBoard;