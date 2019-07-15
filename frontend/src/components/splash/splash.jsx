import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import './splash.css';

export default class Splash extends Component {
    render() {
        return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                    <Link to='/lobby'>
                        <button className="blue-button" id="splash-page-create-lobby-button">Create Lobby</button>
                    </Link>
                </div>
            </div>
        )
    }
}
