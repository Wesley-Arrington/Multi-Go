import React, { Component } from 'react';
import BlackCircle from '../../../images/circular-shape-silhouette-black.png';
import WhiteCircle from '../../../images/circular-shape-silhouette-white.png';
import BlueCircle from '../../../images/circular-shape-silhouette-blue.png';
import RedCircle from '../../../images/circular-shape-silhouette-red.png';
import GreenCircle from '../../../images/circular-shape-silhouette-green.png';


class Players extends Component {
    constructor(props) {
        super(props);
        this.players = this.setPlayers();    
    }

    setPlayers() { 
        let players;
        // kc: at first entry, information is in frontend store.
        if (Object.keys(this.props.game).length > 0) {
            players = this.createStopLight(this.props.game.players, this.props.game.turn);
        } else if (Object.keys(this.props.game).length === 0) {
        // kc: on refresh, information is in sessionStorage
            let localGame = JSON.parse(sessionStorage.getItem('game'));
            players = this.createStopLight(localGame.players, localGame.turn);
        }

        return players
    }

    createStopLight(players, turn) {
        // kc: update
        const colors = ['Red', 'Green', 'Blue', 'Yellow']

        let stopLight = players.map((player, idx) => {
            return (
                <div className='lobby-players-player' key={idx}>
                    {/* <img className="lobby-go-piece-image" src={`${colors[idx]}Circle`} alt="" /> */}
                    <b>{colors[idx]}</b>
                </div>
            )
        })

        // kc: update
        switch (turn % players.length) {
            case 0:
                stopLight[0] =
                    <div style={{ backgroundColor: "red" }} key={0} className='lobby-players-player'>
                        <b>{colors[0]}</b>
                    </div>
                break;
            case 1:
                stopLight[1] =
                    <div style={{ backgroundColor: "green" }} key={1} className='lobby-players-player'>
                        <b>{colors[1]}</b>
                    </div>
                break;
            case 2:
                stopLight[2] =
                    <div style={{ backgroundColor: "blue" }} key={2} className='lobby-players-player'>
                        <b>{colors[2]}</b>
                    </div>
                break;
            case 3:
                stopLight[3] =
                    <div style={{ backgroundColor: "Yellow" }} key={3} className='lobby-players-player'>
                        <b>{colors[3]}</b>
                    </div>
                break;
        }

        return stopLight
    }

    render() {
        this.players = this.setPlayers();

        return (
            <div className="lobby-players">
                {this.players}
            </div>
        )
    }
}

export default Players;
