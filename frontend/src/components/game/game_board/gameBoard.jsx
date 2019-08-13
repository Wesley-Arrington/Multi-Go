import React, { Component } from 'react';
import io from 'socket.io-client';
import Game from '../GameLogic/gameWebSocks';

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.padding = 20;
        // this.size = 19-1;
        // this.size = 13-1;
        // this.size = 25-1;
        // kc: -1 because canvas needs to be adjusted by 1. otherwise protruding lines
        this.size = this.props.game.size-1;
        this.stoneColor = "red";	// initial color for transparent circle
        this.offset = 50;					// space at top for messages
        this.message = "When it's your turn, click to place stone"; // initial message

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // kc: there's  a bug if game creator immediately refreshes page before 1st move
        // kc attempting to store game info to sessionStorage on first entry
        // b/c i set sessionStorage.game to {} when creating game on splash page
        if (sessionStorage.getItem('game')===null ||
            Object.keys(JSON.parse(sessionStorage.getItem('game'))).length === 0 ) {
            this.game = new Game(this.props.game.players.length, this.size + 1);
            let grid = this.game.grid.flat().map(point => {
                return {
                    xCoord: point.position[0],
                    yCoord: point.position[1],
                    color: point.color
                }
            })

            sessionStorage.setItem("game", JSON.stringify(
                {
                    id: this.props.game.id,
                    players: this.props.game.players,
                    grid: grid,
                    turn: 0,
                    size: this.props.game.size
                }
            ));
        }

        // kc: upon refresh, return game information from local storage
        if (Object.keys(this.props.game).length === 0) {
            let g = JSON.parse(sessionStorage.getItem("game"));
            // this.size = g.size - 1

            // kc: adjust size + 1 from canvas to gamelogic
            this.game = new Game(g.players.length, this.size + 1);
            this.props.updateSetting(g);
            this.game.unflatten(g.grid);

            let turn = g.turn % g.players.length;
            if (turn === 0) this.stoneColor = "red";
            else if (turn === 1) this.stoneColor = "green";
            else if (turn === 2) this.stoneColor = "blue";
            else this.stoneColor = "yellow";

        } else {
            // kc: adjust size + 1 from canvas to gamelogic
            this.game = new Game(this.props.game.players.length, this.size + 1);
        }

        this.canvas1 = document.getElementById('canvas');
        this.ctx = this.canvas1.getContext('2d');
				
        const socket = io('http://localhost:5000');
        socket.on("receiveMove", (data) => {
            // sessionStorage
            sessionStorage.setItem("game", JSON.stringify(
                {
                    id: this.props.game.id,
                    players: this.props.game.players,
                    grid: data.grid,
                    turn: data.turn,
                    size: this.props.game.size
                }
            ));
            
            this.game.placeStone(data.x, data.y, data.color);
            this.props.updateSetting(data);

            this.nextTurn(data.turn);
            
            if (this.props.game.players.indexOf(this.props.session.user.email) ===
                this.props.game.turn % this.props.game.players.length) {

                this.message = "Your turn";
            };

            this.drawBoard();
        })

        socket.on("joinGame", (data) => {
            console.log("joinGame")
            console.log(data);
            this.props.updateSetting(data)

            if (this.props.game.players.indexOf(this.props.session.user.email) === 0 &&
                this.props.game.turn === 0 && 
                !this.props.game.players.includes(null)) {

                this.message += ". It is now your turn";
                this.drawBoard();
            };

        })

        this.drawBoard();
        this.setupUI();
    }
		
    nextTurn(turn) {
        // kc: update
        switch (turn % this.game.players) {
            case 0:
                this.stoneColor = "red";
                break;
            case 1:
                this.stoneColor = "green";
                break;
            case 2:
                this.stoneColor = "blue";
                break;
            case 3:
                this.stoneColor = "yellow"    
                break;
        }
    }

    drawBoard() {	

        // Box width
        let bw = this.size * 40 + 2 * this.padding;
        // Box height
        let bh = this.size * 40 + 2 * this.padding;

        // this.ctx.strokeStyle = "red";
        let x = 0;
        let y = 0;

        this.ctx.clearRect(0, 0, bw, bh + this.offset);
        this.ctx.beginPath();
        
        this.drawMessage(bw);

        for (let i = 0; i <= this.size; i++) {
            this.ctx.moveTo(x + this.padding, this.padding+ this.offset);
            this.ctx.lineTo(x + this.padding, bh - this.padding + this.offset);
            x += 40
        }
        // this.ctx.stroke();

        for (let i = 0; i <= this.size; i++) {
            this.ctx.moveTo(this.padding, y + this.padding + this.offset);
            this.ctx.lineTo(bw - this.padding, y + this.padding + this.offset);
            y += 40
        }

        this.ctx.stroke();
        
        // draw little black circles on board
        if (this.size === 18) {

            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    this.drawCircle((6 * x + 3) * 40 + 20, (6 * y + 3) * 40 + 20 + this.offset, "black", 5);
                }						
            }
        } else if (this.size===12) {
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    this.drawCircle((4 * x + 2) * 40 + 20, (4 * y + 2) * 40 + 20 + this.offset, "black", 5);
                }
            }
        } else if (this.size===24) {
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    this.drawCircle((8 * x + 4) * 40 + 20, (8 * y + 4) * 40 + 20 + this.offset, "black", 5);
                }
            }
        }

        this.game.grid.forEach((row, idx1) => {
            row.forEach((point, idx2) => {
                if (point.color !== 'empty') {
                    this.drawCircle(idx1 * 40 + 20, idx2 * 40 + 20 + this.offset, point.color, 17);
                }
            })
        }) 
    }
		
    drawMessage(bw) {
        this.ctx.font = "20px sans-serif";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.message, bw / 2, 0 + this.offset-10);	
    }

    setupUI() {
        // draws transparent circle indicating where move would occur
        this.canvas1.addEventListener("mousemove", event => {
            let mouseX = ((event.clientX-30) / 40);
            let mouseY = ((event.clientY - 91 - this.offset) / 40);

            if (this.xCoord !== Math.floor(mouseX) || this.yCoord !== Math.floor(mouseY)) {
                this.drawBoard();
                this.drawCircle(Math.floor(mouseX) * 40 + 20, Math.floor(mouseY) * 40 + 20 + this.offset, this.stoneColor, 17, 0.2);
            }

            this.xCoord = Math.floor(mouseX);
            this.yCoord = Math.floor(mouseY);
        })

        // gets position for stone placement when clicked
        this.canvas1.addEventListener("click", this.handleClick)
    }
    
    handleClick(event) {
        this.canvas1.removeEventListener("click", this.handleClick);
        let xCoord = Math.floor((event.clientX - 30) / 40);
        let yCoord = Math.floor((event.clientY - 91 - this.offset) / 40);

        this.move(xCoord, yCoord).then(() => {

            if (this.props.game.players.includes('Computer')) {
                this.nextTurn(this.props.game.turn);
                this.move(1, this.props.game.turn).then(() => { this.nextTurn(this.props.game.turn) })
                    .then(() => { this.canvas1.addEventListener("click", this.handleClick) });
            } else {
                this.canvas1.addEventListener("click", this.handleClick);  
            }

        });
    }

    move(xCoord, yCoord) {
        // kc: if this move is valid then do the rest, if not do nothing

        return new Promise((resolve, reject) => {

        try {
            // kc: if the # of players is not met, cannot place stone
            if (this.props.game.players.includes(null)) { 
                throw "Cannot start. Not enough players in game";
            } else if (this.props.game.players.indexOf("Computer") ===
                this.props.game.turn % this.props.game.players.length){
                    // do nothing
            } else if (this.props.game.players.indexOf(this.props.session.user.email) !==
                        this.props.game.turn % this.props.game.players.length) {
                throw "Not your turn";
            };

            this.game.placeStone(xCoord, yCoord, this.stoneColor);
            this.drawBoard();

            // backend Patch data
            let grid = this.game.grid.flat().map(point => {
                return {
                    xCoord: point.position[0],
                    yCoord: point.position[1],
                    color: point.color
                }
            });

            // websocket communication
            const socket = io('http://localhost:5000');
            socket.emit("sendingMove", {
                message: "moved",
                x: xCoord,
                y: yCoord,
                color: this.stoneColor,
                turn: this.props.game.turn + 1,
                grid: grid
            });

            let data = {
                id: this.props.game.id,
                player_ids: this.props.game.players,
                grid: grid,
                turn: this.props.game.turn + 1
            }

            this.message = "Legal move, thank you"
            this.drawBoard();
            this.props.makeMove(data).then(() => { resolve() })

            }
            catch (err) {
                this.message = "Illegal move, " + err;
                this.drawBoard();
                // kc: changed to resolve b/c throw err would cause failure when 
                // adding listener back
                resolve();
            }
        })
    }

    drawCircle(x, y, color, size, alpha = 1) {
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI)
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        // this.ctx.stroke();
    }

    render() {
        // kc: upon refresh, return game information from local storage
        if (Object.keys(this.props.game).length === 0 && sessionStorage.getItem('game') !== null) {
            let g = JSON.parse(sessionStorage.getItem("game"));
            this.size = g.size - 1
        }


        const background = {
            background: 'tan',
            height: this.size * 40 + 2 * this.padding + this.offset,
            width: this.size * 40 + 2 * this.padding
        }

        const style = {
            display: 'flex',
            flexDirection: 'row'
        }
        
        return (
            <div style={style}>
                <div style={background}>
                    <canvas id="canvas" style={background} height={this.size * 40 + 2 * this.padding + this.offset} width={this.size * 40 + 2 * this.padding}></canvas>
                </div>
            </div>
        )
    }
}

export default GameBoard;