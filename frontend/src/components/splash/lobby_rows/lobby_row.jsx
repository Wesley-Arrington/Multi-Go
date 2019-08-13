import React, { Component } from 'react'
import io from 'socket.io-client';


export default class LobbyRow extends Component {
    constructor(props) {
        super(props);
        this.handleClickJoin = this.handleClickJoin.bind(this);
        this.handleClickView = this.handleClickView.bind(this);
    }

    componentDidMount() {


    }

    handleClickJoin() {
        let players = this.props.games[this.props.idx].player_ids;
        
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
            player_ids: players,
            turn: 0
        }

        // kc: used a .then perfectly!
        this.props.joinGame(data).then(() => {

            // websocket communication
            const socket = io('http://localhost:5000');
            socket.emit("joinGame", {
                message: "new player has joined the game",
                players: this.props.games[this.props.idx].player_ids
            });

            socket.emit("indexPage", {
                message: "update Index Page"
            });

            this.props.history.push(`/game/${this.props.games[this.props.idx]._id}/`)
        })
    }
    
    handleClickView() {
        this.props.history.push(`/game/${this.props.games[this.props.idx]._id}/`)
    }

    render() {

        return (
            <div className="lobby-row">
                <h3 className="lobby-row-title">{this.props.games[this.props.idx].name}</h3>

                <div className="simple-column">
                    <h4>chat-enabled: Yes</h4>
                    <h4>board-size: {this.props.games[this.props.idx].size}x{this.props.games[this.props.idx].size}</h4>
                    <h4>grid-layout: Square Grid</h4>
                </div>

                <div className="lobby-row-right-items">
                    <h5>{this.props.games[this.props.idx].player_ids.filter(ele => { return ele }).length}/{this.props.games[this.props.idx].player_ids.length} Players</h5>

                    {(this.props.games[this.props.idx].player_ids.filter(ele => { return ele }).length/this.props.games[this.props.idx].player_ids.length === 1) ? 
                        <div>Full Game</div> : 
                        <button onClick={this.handleClickJoin} className="blue-button" id="splash-page-join-lobby-button">Join Game</button>}

                </div>
            </div>
        )
    }
}
