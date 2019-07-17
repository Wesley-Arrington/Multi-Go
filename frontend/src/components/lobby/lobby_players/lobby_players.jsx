import React, { Component } from 'react';
import BlackCircle from '../../../images/circular-shape-silhouette-black.png';
import WhiteCircle from '../../../images/circular-shape-silhouette-white.png';
import BlueCircle from '../../../images/circular-shape-silhouette-blue.png';
import RedCircle from '../../../images/circular-shape-silhouette-red.png';
import GreenCircle from '../../../images/circular-shape-silhouette-green.png';

export default class LobbyPlayers extends Component {
    
    render() {
        return (
            <div className="lobby-players">
                <div className="lobby-players-player">                
                    <img className="lobby-go-piece-image" src={BlackCircle} alt=""/>
                    <b className="lobby-go-player-color">Black</b> 
                    <p> (sally) </p>
                </div>
                <div className="lobby-players-player"> 
                    <img className="lobby-go-piece-image" src={WhiteCircle} alt="" />
                    <b>White</b> 
                </div>
                <div className="lobby-players-player"> 
                    <img className="lobby-go-piece-image" src={BlueCircle} alt="" />
                    <b>Blue </b> 
                </div>
                <div className="lobby-players-player"> 
                    <img className="lobby-go-piece-image" src={RedCircle} alt="" />
                    <b>Red </b>
                </div>
                <div className="lobby-players-player"> 
                    <img className="lobby-go-piece-image" src={GreenCircle} alt="" />
                    <b>Green</b> 
                </div>
            </div>
        )
    }
}
