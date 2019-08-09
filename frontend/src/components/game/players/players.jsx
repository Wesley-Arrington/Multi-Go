import React, { Component } from 'react';
import BlackCircle from '../../../images/circular-shape-silhouette-black.png';
import WhiteCircle from '../../../images/circular-shape-silhouette-white.png';
import BlueCircle from '../../../images/circular-shape-silhouette-blue.png';
import RedCircle from '../../../images/circular-shape-silhouette-red.png';
import GreenCircle from '../../../images/circular-shape-silhouette-green.png';

class Players extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const colors = ['Red', 'Green', 'Blue']

        const players= new Array(this.props.game.players);
        
        for (let i=0; i<this.props.game.players; i++) {
            players[i] = 
            
            <div className='lobby-players-player'>
                {/* <img className="lobby-go-piece-image" src={`${colors[idx]}Circle`} alt="" /> */}
                <b>{colors[i]}</b>
            </div>
        }
        // players = players.map((player, idx) => {
        //     return (
        //     <div className='lobby-players-player'>
        //             {/* <img className="lobby-go-piece-image" src={`${colors[idx]}Circle`} alt="" /> */}
        //             <b>{colors[idx]}</b>
        //     </div>
        //     )
        // })

        switch (this.props.game.turn % this.props.game.players) {
            case 0:
                players[0] = 
                    <div style={{ backgroundColor: "yellow" }} className='lobby-players-player'>
                        <b>{colors[0]}</b>
                    </div>
                break;
            case 1:
                players[1] = 
                    <div style={{ backgroundColor: "yellow" }} className='lobby-players-player'>
                        <b>{colors[1]}</b>
                    </div>
                break;
            case 2:
                players[2] =
                    <div style={{ backgroundColor: "yellow" }} className='lobby-players-player'>
                        <b>{colors[2]}</b>
                    </div>
                break;
        }

        console.log(players)

        return (
            <div className="lobby-players">
                {players}
            </div>
        )
    }
}

export default Players;
