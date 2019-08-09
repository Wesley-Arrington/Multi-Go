import React, { Component } from 'react';
import io from 'socket.io-client';
import Game from '../GameLogic/gameWebSocks';
import PlayersContainer from '../players/players_container';


class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
        this.padding = 20;
        this.size = 19-1
        this.stoneColor = "red"
        // this.game = new Game(this.props.numPlayers,this.size+1)
    }

    componentDidMount() {
        // this.props.openModal();
        this.canvas1 = document.getElementById('canvas');
        this.ctx = this.canvas1.getContext('2d');

        const socket = io('http://localhost:5000');
        socket.on("receiveMove", (data) => {
            console.log("received move")
            console.log(data);
            this.game.placeStone(data.x, data.y, data.color);
            // kc: an issue with websocket communcation
            this.props.updateTurn();
            
            switch (this.props.game.turn % this.game.players) {
                case 0:
                    this.stoneColor = "red";
                    break;
                case 1:
                    this.stoneColor = "green";
                    break;
                case 2:
                    this.stoneColor = "blue";
                    break;
            }

            this.ctx.clearRect(0,0,this.size*40+this.padding*2,this.size*40+this.padding*2)
            this.drawBoard();
        })

        socket.on("start", (data) => {
            console.log("debug")
            console.log(data);
            this.game = new Game(data.numPlayers, 20 - 1);
            this.setState({game: this.game});
            this.props.changeSetting(data.numPlayers);
        })

        // this.props.getGame(this.props.game.id);

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

        if (this.game) {
            this.game.grid.forEach((row, idx1) => {
                row.forEach((point, idx2) => {
                    if (point.color !== 'empty') {
                        this.drawCircle(idx1 * 40 + 20, idx2 * 40 + 20, point.color);
                    }
                })
            }) 
        }
    }

    setupUI() {
        this.canvas1.addEventListener("mousemove", event => {
            let mouseX = ((event.clientX-30) / 40);
            let mouseY = ((event.clientY-91) / 40);
            if (this.xCoord !== Math.floor(mouseX) || this.yCoord !== Math.floor(mouseY)) {
                this.ctx.clearRect(0, 0, this.size * 40 + 2 * this.padding, this.size * 40 + 2 * this.padding)
                this.drawBoard();
                this.drawCircle(Math.floor(mouseX) * 40 + 20, Math.floor(mouseY) * 40 + 20, this.stoneColor, 0.2);
            }
            this.xCoord = Math.floor(mouseX)
            this.yCoord = Math.floor(mouseY)
        })

        this.canvas1.addEventListener("click", event => {
            let xCoord = Math.floor((event.clientX-30)/40)
            let yCoord = Math.floor((event.clientY-91)/40)

            switch (this.props.game.turn % this.game.players) {
                case 0:
                    this.stoneColor="red";
                    break;
                case 1:
                    this.stoneColor = "green";
                    break;
                case 2:
                    this.stoneColor = "blue";
                    break;
            }

            // kc: if this move is valid then do the rest, if not do nothing
            if (this.game.placeStone(xCoord, yCoord, this.stoneColor)) {

                this.ctx.clearRect(0, 0, this.size * 40 + 2 * this.padding, this.size * 40 + 2 * this.padding)
                this.drawBoard()

                // kc: update frontend Store, may have to revisit later
                // this.props.updateTurn();

                const socket = io('http://localhost:5000');
                socket.emit("sendingMove", { message: "moved", x: xCoord, y: yCoord, color: this.stoneColor, turn: `${this.game.turn}` });


                // backend Patch data
                let grid = this.game.grid.flat().map(point => {
                    return {
                        xCoord: point.position[0],
                        yCoord: point.position[1],
                        color: point.color
                    }
                })

                let placeHolderData = {
                    player_ids: this.game.players,
                    grid: grid,
                    turn: "" + this.game.turn
                }

                this.props.makeMove(this.game.id, placeHolderData)
            }
        })
    }

    drawCircle(x, y, color, alpha = 1) {
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 17, 0, 2 * Math.PI)
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        // this.ctx.stroke();
    }

    render() {
        // if (this.game.grid === undefined) return null;
        
        const background = {
            background: 'lightblue',
            height: this.size * 40 + 2 * this.padding,
            width: this.size * 40 + 2 * this.padding
        }

        let stoplight;
        if (this.game) stoplight = <PlayersContainer/>

        return (
            <div>
                <div style={background}>
                    <canvas id="canvas" style={background} height={this.size * 40 + 2 * this.padding} width={this.size * 40 + 2 * this.padding}></canvas>
                </div>
                <div>
                    {stoplight}
                </div>
            </div>

        )
    }
}

export default GameBoard;