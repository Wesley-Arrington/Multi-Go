import React, { Component } from 'react';
import io from 'socket.io-client';

export default class GameSettings extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: "Game Name",
            value: "2",
            players: new Array(2),
            size: 13
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChangePlayers = this.handleChangePlayers.bind(this);
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleChangePlayers(e) {
        this.setState({
            value: e.target.value,
            players: new Array(parseInt(e.target.value, 10)),
        })
    }

    handleChangeSize(e) {
        this.setState({
            value: e.target.value,
            size: parseInt(e.target.value,10)
        })
    }

    handleClick() {
        let players = this.state.players

        players[0] = this.props.session.user.email;
        let data = {
            name: this.state.name,
            players: players,
            size: this.state.size,
            turn: 0
        }

        let size = {size: this.state.size};
        this.props.closeModal();

        this.props.updateSetting(size);

        this.props.newGame(data).then((game) => {
            return this.props.history.push(`/game/${game.game._id}/`)
        });

        // websocket communication
        const socket = io('https://multi-go.herokuapp.com');
        socket.emit("indexPage", {
            message: "update Index Page"
            // kc: we're just going to make other users do a fetchall request to DB
        });

        // , this.emitMsg()
        // callback should do the same thing as componentDidUpdate
        // #ofplayers should come from the form in modal 
    }

    render() {
        let config = `Players: ${this.state.players.length}, Size: ${this.state.size}x${this.state.size}`

        return (
            <div className="game-settings-white-background">
                <div className="game-settings-content-container">
                    <div className="simple-column">
                        <h3 className="lobby-edit-game-title">
                            <b>Game Settings</b>
                            <h5>{config}</h5>
                        </h3>
                        
                        {/* KC: Probably link Lobby Name to Server Title on Splash Page  */}
                        <input className="edit-game-input-text" type="text" placeholder="Game Name" value={this.state.name} onChange={this.handleChangeName}/>
                        
                        <label htmlFor=""> Number of Players:</label>
                        <select value={this.state.value} onChange={this.handleChangePlayers} name="">
                            <option value="2">2 Players</option>
                            <option value="3">3 Players</option>
                            <option value="4">4 Players</option>
                            {/* <option value="Andean">5 Player</option> */}
                        </select>

                        <label htmlFor=""> Board Size:</label>
                        <select value={this.state.value} onChange={this.handleChangeSize} name="">
                            <option value='13'>13x13</option>
                            <option value="19">19x19</option>
                            <option value="25">25x25</option>
                        </select>

                        <button onClick={this.handleClick} className="blue-button" id="lobby-save-settings-button"> Play! </button>
                    </div>
                </div>
            </div>
        )
    }
}
