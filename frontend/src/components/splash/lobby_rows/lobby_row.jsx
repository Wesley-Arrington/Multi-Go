import React, { Component } from 'react'
import io from 'socket.io-client';


export default class LobbyRow extends Component {
    constructor(props) {
        super(props);
        this.handleClickJoin = this.handleClickJoin.bind(this);
        this.handleClickView = this.handleClickView.bind(this);
        this.handleClickLogin = this.handleClickLogin.bind(this);
    }

    handleClickLogin() {
        this.props.openModal('login');
    }

    handleClickJoin() {
        // KC: Only allow join when SessionStorage.game is null to prevent players from starting/joining another game 
        // if (sessionStorage.game === null) {

            let players = this.props.games[this.props.idx].players;
            
            // kc: setting sessionStorage.game to {} for systematic approach
            sessionStorage.setItem("game", JSON.stringify({}))

            for (let i = 0; i<players.length; i++) {
                if (!players[i]) {
                    players[i] = this.props.session.user.email;
                    break;
                }
            }

            let data = {
                id: this.props.games[this.props.idx]._id,
                players: players,
                turn: 0
            }

            // kc: used a .then perfectly!
            this.props.joinGame(data).then((res) => {

                // websocket communication
                const socket = io('https://multi-go.herokuapp.com');
                socket.emit("joinGame", {
                    message: "new player has joined the game",
                    id: res.game._id,
                    players: this.props.games[this.props.idx].players
                });

                socket.emit("indexPage", {
                    message: "update Index Page"
                });

                this.props.history.push(`/game/${this.props.games[this.props.idx]._id}/`)
            })
        // }
    }
    
    handleClickView() {
        this.props.history.push(`/game/${this.props.games[this.props.idx]._id}/`)
    }

    render() {

        if (this.props.session.isAuthenticated) {
            return (
                <div className="lobby-row">
                    <h3 className="lobby-row-title">{this.props.games[this.props.idx].name}</h3>

                    <div className="simple-column">
                        <h4>chat-enabled: Yes</h4>
                        <h4>board-size: {this.props.games[this.props.idx].size}x{this.props.games[this.props.idx].size}</h4>
                        <h4>grid-layout: Square Grid</h4>
                    </div>

                    <div className="lobby-row-right-items">
                        <h5>{this.props.games[this.props.idx].players.filter(ele => { return ele }).length}/{this.props.games[this.props.idx].players.length} Players</h5>

                        {(this.props.games[this.props.idx].players.filter(ele => { return ele }).length / this.props.games[this.props.idx].players.length === 1) ?
                            <div>Full Game</div> :
                            <button onClick={this.handleClickJoin} className="blue-button" id="splash-page-join-lobby-button">Join Game</button>}

                    </div>
                </div>
            )
        } else {
            return (
                <div className="lobby-row">
                    <h3 className="lobby-row-title">{this.props.games[this.props.idx].name}</h3>

                    <div className="simple-column">
                        <h4>chat-enabled: Yes</h4>
                        <h4>board-size: {this.props.games[this.props.idx].size}x{this.props.games[this.props.idx].size}</h4>
                        <h4>grid-layout: Square Grid</h4>
                    </div>

                    <div className="lobby-row-right-items">
                        <h5>{this.props.games[this.props.idx].players.filter(ele => { return ele }).length}/{this.props.games[this.props.idx].players.length} Players</h5>

                        {(this.props.games[this.props.idx].players.filter(ele => { return ele }).length / this.props.games[this.props.idx].players.length === 1) ?
                            <div>Full Game</div> :
                            <button onClick={this.handleClickLogin} className="blue-button" id="splash-page-join-lobby-button">Join Game</button>}

                    </div>
                </div>
            )
        }
      
    }
}
