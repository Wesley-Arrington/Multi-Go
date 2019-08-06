import React, { Component } from 'react';
import io from 'socket.io-client';
import Game from '../../GameLogic/game';


class SquareBoard extends Component {
    constructor(props) {
        super(props)
        this.padding = 20;
        debugger
        // this.game = new Game(null, 2, this.props.size)
        // this.game = new Game(2, this.props.size)
        // debugger
    }

    componentDidMount() {
        this.canvas1 = document.getElementById('canvas');
        this.ctx = this.canvas1.getContext('2d');
        this.drawLine()
        this.setupPointUIs()
    }

    drawLine() {
        // Box width
        let bw = this.props.size*40+2*this.padding;
        // Box height
        let bh = this.props.size*40+2*this.padding;

        this.ctx.strokeStyle = "black";
        let x = 0;
        let y = 0;

        for (let i = 0; i <= this.props.size; i++) {
            // console.log(`x1y1: ${x+p},${p} x2y2: ${x+p},${bh-p}`)
            this.ctx.moveTo(x + this.padding, this.padding);
            this.ctx.lineTo(x + this.padding, bh - this.padding);
            this.ctx.stroke();
            x += 40
        }

        for (let i = 0; i <= this.props.size; i++) {
            this.ctx.moveTo(this.padding, y + this.padding);
            this.ctx.lineTo(bw - this.padding, y + this.padding);
            this.ctx.stroke();
            y += 40
        }

        this.ctx.stroke();
    }

    setupPointUIs() {
        // , this.props.player_ids.length
        // for (let i=0; i<=this.props.size; i++) {
            // for (let j=0; j<=this.props.size; j++) {

                this.canvas1.addEventListener("mousemove", event => {
                    let x = Math.floor(event.clientX / 40)
                    let y = Math.floor(event.clientY / 40)

                    if (x !== Math.floor(event.clientX / 40) || y !== Math.floor(event.clientY / 40)) {
                        // rerender Board;
                        this.ctx.clearRect(0,0, this.props.size*40+2*this.padding, this.props.size*40+2*this.padding)
                        this.ctx.drawLine();
                    }
                    // console.log(event.movementX)
                    // console.log(event.movementY)
                    console.log(Math.floor(event.clientX / 40))
                    console.log(Math.floor(event.clientY / 40))
                })

                this.canvas1.addEventListener("click", event => {
                    this.showCoords(event)
                    this.playMove()
                })
    }

    playMove() {
        debugger
    }

    showCoords(event) {
        console.log(`clicked: ${Math.floor(event.clientX/40)}`)
        console.log(`clicked: ${Math.floor(event.clientY/40)}`)
    }


    render() {
        const background = {
            background: 'lightblue',
            height: this.props.size*40+2*this.padding,
            width: this.props.size*40+2*this.padding
        }
        return ( 

            <div style={background}>
                <canvas style={background} height={this.props.size*40+2*this.padding} width={this.props.size*40+2*this.padding} id="canvas"></canvas>
            </div>
        )
    }
}

export default SquareBoard;