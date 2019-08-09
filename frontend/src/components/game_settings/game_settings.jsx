import React, { Component } from 'react';
import io from 'socket.io-client';

export default class GameSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numPlayers: 2
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // kc will have to eventaully take input value from form
        this.setState({
            numPlayers: 3
        })

            // , this.emitMsg()
        // callback should do the same thing as componentDidUpdate

    }

    componentDidUpdate() {
        console.log(this.state)
        console.log("click")
        const socket = io('http://localhost:5000');
        socket.emit("start", { 
            message: "start", 
            numPlayers: this.state.numPlayers});  
    }

    // emitMsg() {
    //     console.log(this.state)
    //     console.log("click")
    //     const socket = io('http://localhost:5000');
    //     socket.emit("start", { message: "start" });
    // }

    componentDidMount() {
        
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
