import React, { Component } from 'react';
import GameBoardButtonContainer from './gameBoardButton_Container';
import io from 'socket.io-client';
import Game from '../GameLogic/gameWebSocks';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        // this.createButtons = this.createButtons.bind(this)
        this.padding = 20;
        this.size = 19-1
        this.game = new Game(2,this.size+1)
    }

    componentDidMount() {
        const socket = io('http://localhost:5000');
        socket.on("receiveMove", (data) => {
            console.log("received move")
            this.props.getGame(this.props.game_id);
        })

        this.props.getGame(this.props.game_id);

        this.canvas1 = document.getElementById('canvas');
        this.ctx = this.canvas1.getContext('2d');
        this.drawBoard();
        this.setupUI();
    }

    drawBoard() {
        // Box width
        let bw = this.size * 40 + 2 * this.padding;
        // Box height
        let bh = this.size * 40 + 2 * this.padding;

        this.ctx.strokeStyle = "black";
        let x = 0;
        let y = 0;

        for (let i = 0; i <= this.size; i++) {
            // console.log(`x1y1: ${x+p},${p} x2y2: ${x+p},${bh-p}`)
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

        this.ctx.stroke();
    }

    setupUI() {

        this.canvas1.addEventListener("mousemove", event => {
            let x = Math.floor(event.clientX / 40)
            let y = Math.floor(event.clientY / 40)

            if (x !== Math.floor(event.clientX / 40) || y !== Math.floor(event.clientY / 40)) {
                // rerender Board;
                this.ctx.clearRect(0, 0, this.size * 40 + 2 * this.padding, this.size * 40 + 2 * this.padding)
                this.ctx.drawLine();
            }
            // console.log(Math.floor(event.clientX / 40))
            // console.log(Math.floor(event.clientY / 40))
        })

        this.canvas1.addEventListener("click", event => {
            // console.log(`clicked: ${Math.floor(event.clientX / 40)}`)
            // console.log(`clicked: ${Math.floor(event.clientY / 40)}`)
            
            this.game.placeStone(Math.floor(event.clientX / 40), Math.floor(event.clientY / 40, "B"))

            let x = Math.floor(event.clientX / 40) * 40 + 20
            let y = Math.floor(event.clientY / 40) * 40 + 20

            console.log(x)
            console.log(y)
            this.ctx.beginPath();
            this.ctx.arc(x, y, 18, 0, 2*Math.PI)
            this.ctx.fillStyle = 'Black';
            this.ctx.fill();
            this.ctx.stroke();

            // console.log(this.game)
        })
    }

    handleClick() {
            const socket = io('http://localhost:5000');
            socket.emit("sendingMove", { message: "moved" });
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