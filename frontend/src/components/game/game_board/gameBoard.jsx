import React, { Component } from 'react';
import io from 'socket.io-client';
import Game from '../GameLogic/gameWebSocks';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.padding = 20;
        this.size = 19-1
        // kc: comment out fro now
        // this.game = new Game(this.props.game.players.length,this.size+1)
    }

    componentDidMount() {
        // we can move this to game component and pass down ctx as props
        this.canvas1 = document.getElementById('canvas');
        this.ctx = this.canvas1.getContext('2d');

        const socket = io('http://localhost:5000');
        socket.on("receiveMove", (data) => {
            console.log("received move")
            console.log(data);
            this.game.placeStone(data.x, data.y, data.color);
            // kc: an issue with websocket communcation
            this.props.updateTurn();
            this.ctx.clearRect(0,0,this.size*40+this.padding*2,this.size*40+this.padding*2)
            this.drawBoard();

            // this.props.getGame(this.props.game_id);
        })

        this.props.getGame(this.props.game.id);

        this.drawBoard();
        this.setupUI();
    }

    drawBoard() {
        // Box width
        let bw = this.size * 40 + 2 * this.padding;
        // Box height
        let bh = this.size * 40 + 2 * this.padding;

        // this.ctx.strokeStyle = "red";
        let x = 0;
        let y = 0;

        this.ctx.beginPath();

        for (let i = 0; i <= this.size; i++) {
            this.ctx.moveTo(x + this.padding, this.padding);
            this.ctx.lineTo(x + this.padding, bh - this.padding);
            x += 40
        }

        for (let i = 0; i <= this.size; i++) {
            this.ctx.moveTo(this.padding, y + this.padding);
            this.ctx.lineTo(bw - this.padding, y + this.padding);
            y += 40
        }

        this.ctx.stroke();

        // this.game.grid.forEach((row, idx1) => {
        //     row.forEach((point, idx2) => {
        //         if (point.color !== 'empty') {
        //             this.drawCircle(idx1 * 40 + 20, idx2 * 40 + 20, point.color);
        //         }
        //     })
        // }) 
    }

    setupUI() {
        this.canvas1.addEventListener("mousemove", event => {
            let mouseX = ((event.clientX-30) / 40);
            let mouseY = ((event.clientY-91) / 40);
            console.log(event.clientY);
            if (this.xCoord !== Math.floor(mouseX) || this.yCoord !== Math.floor(mouseY)) {
                this.ctx.clearRect(0, 0, this.size * 40 + 2 * this.padding, this.size * 40 + 2 * this.padding)
                this.drawBoard();
                this.drawCircle(Math.floor(mouseX) * 40 + 20, Math.floor(mouseY)*40+20, "Yellow");
            }
            this.xCoord = Math.floor(mouseX)
            this.yCoord = Math.floor(mouseY)
        })

        this.canvas1.addEventListener("click", event => {
            let xCoord = Math.floor((event.clientX-30)/40)
            let yCoord = Math.floor((event.clientY-91)/40)

            let stoneColor;
            switch (this.props.game.turn % this.props.game.players.length) {
                case 0:
                    stoneColor="red";
                    break;
                case 1:
                    stoneColor = "green";
                    break;
                case 2:
                    stoneColor = "blue";
                    break;
            }

            // kc: if this move is valid then do the rest, if not do nothing
            if (this.game.placeStone(xCoord, yCoord, stoneColor)) {

                this.ctx.clearRect(0, 0, this.size * 40 + 2 * this.padding, this.size * 40 + 2 * this.padding)
                this.drawBoard()

                // kc: update frontend Store, may have to revisit later
                // this.props.updateTurn();

                // websocket communication
                const socket = io('http://localhost:5000');
                socket.emit("sendingMove", { message: "moved", x: xCoord, y: yCoord, color: stoneColor, turn: `${this.props.game.turn}` });


                // backend Patch data
                let grid = this.game.grid.flat().map(point => {
                    return {
                        xCoord: point.position[0],
                        yCoord: point.position[1],
                        color: point.color
                    }
                })

                let placeHolderData = {
                    player_ids: this.props.game.players,
                    grid: grid,
                    turn: "" + this.props.game.turn
                }

                this.props.makeMove(this.props.game.id, placeHolderData)
            }
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