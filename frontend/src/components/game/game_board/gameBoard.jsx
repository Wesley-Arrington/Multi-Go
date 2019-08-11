import React, { Component } from 'react';
import io from 'socket.io-client';
import Game from '../GameLogic/gameWebSocks';
import PlayersContainer from '../players/players_container';


class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.padding = 20;
        this.size = 19-1;
        this.stoneColor = "red";	// initial color for transparent circle
        this.offset = 50;					// space at top for messages
        this.message = "When it's your turn, click to place stone" // initial message

    }

    componentDidMount() {
        // kc: there's  a bug if game creator immediately refreshes page before 1st move
        // kc attempting to store game info to localstorage on first entry
        // b/c i set localstorage.game to {} when creating game on splash page
        if (Object.keys(JSON.parse(localStorage.getItem('game'))).length === 0 ) {

            this.game = new Game(this.props.game.players.length, this.size + 1);
            let grid = this.game.grid.flat().map(point => {
                return {
                    xCoord: point.position[0],
                    yCoord: point.position[1],
                    color: point.color
                }
            })

            localStorage.setItem("game", JSON.stringify(
                {
                    id: this.props.game.id,
                    players: this.props.game.players,
                    grid: grid,
                    turn: "" + 0
                }
            ))
        }

        // kc: upon refresh, return game infromation from local storage

        if (Object.keys(this.props.game).length === 0) {
            let g = JSON.parse(localStorage.getItem("game"));
            this.game = new Game(g.players.length, this.size + 1);
            this.props.updateSetting(g);
            this.game.unflatten(g.grid);

            let turn = g.turn % g.players.length;
            if ( turn === 0) this.stoneColor = "red";
            else if ( turn === 1) this.stoneColor = "green";
            else this.stoneColor = "blue";

        } else {
            this.game = new Game(this.props.game.players.length, this.size + 1);
        }

        this.canvas1 = document.getElementById('canvas');
        this.ctx = this.canvas1.getContext('2d');
				
        const socket = io('http://localhost:5000');
        socket.on("receiveMove", (data) => {
            console.log("received move")
            console.log(data);
            this.game.placeStone(data.x, data.y, data.color);
            // kc: an issue with websocket communcation
            this.nextTurn()

            this.drawBoard();
        })

        //this.props.getGame(this.props.game.id);

        this.drawBoard();
        this.setupUI();
    }
		
    nextTurn() {
        this.props.updateTurn();

        switch (this.props.game.turn % this.props.game.players.length) {
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

            this.xCoord = Math.floor(mouseX)
            this.yCoord = Math.floor(mouseY)
        })

        // gets position for stone placement when clicked
        this.canvas1.addEventListener("click", event => {

            let xCoord = Math.floor((event.clientX-30)/40);
            let yCoord = Math.floor((event.clientY-91 - this.offset)/40);

            // kc: if this move is valid then do the rest, if not do nothing
            try {
                // kc: if the # of players is not met, cannot place stone
                if (this.props.game.players.includes(null)) {
                    this.message = "Cannot start. Not enough players in game"
                } else if (this.game.placeStone(xCoord, yCoord, this.stoneColor)) {

                    this.drawBoard()

                    // websocket communication
                    const socket = io('http://localhost:5000');
                    socket.emit("sendingMove", { message: "moved", x: xCoord, y: yCoord, color: this.stoneColor, turn: `${this.props.game.turn}` });

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
                    
                    this.message = "Legal move, thank you"
                    this.drawBoard();
                    // this.nextTurn();
                    this.props.makeMove(this.props.game.id, placeHolderData)
                    localStorage.setItem("game", JSON.stringify(
                        {
                            id: this.props.game.id,
                            players: this.props.game.players,
                            grid: grid,
                            turn: "" + this.props.game.turn
                        }
                    ))
                } 

            }
            catch (err) {
                this.message = "Illegal move, " + err;
                this.drawBoard();
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
        // if (this.game.grid === undefined) return null;
            
        const background = {
            background: 'tan',
            height: this.size * 40 + 2 * this.padding + this.offset,
            width: this.size * 40 + 2 * this.padding
        }

        // let stoplight;
        // if (this.game) stoplight = <PlayersContainer/>

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