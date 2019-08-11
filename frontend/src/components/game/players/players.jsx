import React, { Component } from 'react';
import BlackCircle from '../../../images/circular-shape-silhouette-black.png';
import WhiteCircle from '../../../images/circular-shape-silhouette-white.png';
import BlueCircle from '../../../images/circular-shape-silhouette-blue.png';
import RedCircle from '../../../images/circular-shape-silhouette-red.png';
import GreenCircle from '../../../images/circular-shape-silhouette-green.png';

class Players extends Component {
    constructor(props) {
        super(props)
        this.players = this.setPlayers();      
    }

    setPlayers() { 
        let players;

        // kc: at first entry, information is in frontend store.
        if (Object.keys(this.props.game).length > 0) {
            players = this.createStopLight(this.props.game.players, this.props.game.turn)
        } else if (Object.keys(this.props.game).length === 0) {
        // kc: on refresh, information is in localStorage
            let localGame = JSON.parse(localStorage.getItem('game'))
            players = this.createStopLight(localGame.players, parseInt(localGame.turn))
        }

        return players
    }

    createStopLight(players, turn) {
        const colors = ['Red', 'Green', 'Blue']

        players = players.map((player, idx) => {
            return (
                <div className='lobby-players-player'>
                    {/* <img className="lobby-go-piece-image" src={`${colors[idx]}Circle`} alt="" /> */}
                    <b>{colors[idx]}</b>
                </div>
            )
        })

        switch (turn % players.length) {
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

        return players
    }

    render() {
        // if (!this.props.game.players) return;

        return (
            <div className="lobby-players">
                {this.players}
            </div>
        )
    }
}

export default Players;
