import React, { Component } from 'react';
import io from 'socket.io-client';

export default class GameSettings extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: '2',
            players: new Array(2)
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
            players: new Array(parseInt(e.target.value, 10))
        })
    }

    handleClick() {
        let players = this.state.players

        players[0] = this.props.session.user.email;

        let data = {
            player_ids: players,
            // grid: [{
            //     xCoord: 0,
            //     yCgit boord: 0,
            //     color: "R"
            // }],
            turn: "0"
        }

        this.props.closeModal();

        this.props.newGame(data).then((game) => {
            return this.props.history.push(`/game/${game.game._id}/`)
        });

        // , this.emitMsg()
        // callback should do the same thing as componentDidUpdate
        // #ofplayers should come from the form in modal 
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
                        <select value={this.state.value} onChange={this.handleChange} name="" id="">
                            <option value='2'>2 Player</option>
                            <option value="3">3 Player</option>
                            {/* <option value="Andean">4 Player</option>
                            <option value="Andean">5 Player</option> */}
                        </select>

                        <button onClick={this.handleClick} className="blue-button" id="lobby-save-settings-button"> Play! </button>
                    </div>
                </div>
            </div>
        )
    }
}
