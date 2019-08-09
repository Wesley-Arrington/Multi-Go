import React, { Component } from 'react';
import PlayersContainer from './players_container';
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

        const players = this.props.game.players.map((player, idx) => {
		
		
            return (
            <div className='lobby-players-player'>
                    {/* <img className="lobby-go-piece-image" src={`${colors[idx]}Circle`} alt="" /> */}
                    <b>{colors[idx]}</b>
            </div>
            )
        })

        switch (this.props.game.turn % this.props.game.players.length) {
            case 0:
                players[0] = 
                    <div style={{ backgroundColor: "red" }} className='lobby-players-player'>
                        <b>{colors[0]}</b>
                    </div>
                break;
            case 1:
                players[1] = 
                    <div style={{ backgroundColor: "green" }} className='lobby-players-player'>
                        <b>{colors[1]}</b>
                    </div>
                break;
            case 2:
                players[2] =
                    <div style={{ backgroundColor: "blue" }} className='lobby-players-player'>
                        <b>{colors[2]}</b>
                    </div>
                break;
        }

        return (
            <div className="lobby-players">
                {players}
            </div>
        )
    }
}

export default Players;
