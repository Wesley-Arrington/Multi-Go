import React, { Component } from 'react';
import io from 'socket.io-client';

export default class GameSettings extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("click")
        const socket = io('http://localhost:5000');
        socket.emit("start", { message: "start" });
    }

    componentDidMount() {
        const socket = io('http://localhost:5000');
        socket.on("start", (data) => { 
            console.log("start game message received");
        })
    }

    render() {
        return (
            <div className="game-settings-white-background">
                <div className="game-settings-content-container">
                    <div className="simple-column">
                        <h3 className="lobby-edit-game-title"><b>Game Settings</b></h3>
                        <input className="edit-game-input-text" placeholder="Lobby Name" type="text" name="" id="" />
                        <label htmlFor=""> Number of Players:
                    </label>
                        <select name="" id="">
                            <option value="American">2 Player</option>
                            <option value="Andean">3 Player</option>
                            <option value="Andean">4 Player</option>
                            <option value="Andean">5 Player</option>
                        </select>

                        <button onClick={this.handleClick} className="blue-button" id="lobby-save-settings-button"> Save Settings </button>
                    </div>
                </div>
            </div>
        )
    }
}
