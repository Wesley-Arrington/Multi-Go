import React, { Component } from 'react'

export default class LobbyRow extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        let count = 0;
        let players = this.props.games[this.props.idx].player_ids;
        for (let i = 0; i < players.length; i++) {
            if (players[i]) {
                count += 1
            }
        }

        this.state = {count: count}
    }

    handleClick() {
        let players = this.props.games[this.props.idx].player_ids;
        let flag;
        
        for (let i = 0; i<players.length; i++) {
            if (!players[i]) {
                players[i] = this.props.session.user.email;
                flag = true;
            }
            if (flag) break;
        }

        let dummyData = {
            player_ids: players
        }

        let data = {
            id: this.props.games[this.props.idx]._id,
            players: players
        }
        
        debugger
        this.props.joinGame(this.props.games[this.props.idx]._id, dummyData);
        this.props.updateSetting(data);
        this.props.history.push(`/game/${this.props.games[this.props.idx]._id}/`)
    }
    
    render() {
        // let games = [];
        // for (let i=0;i<this.props.games.length;i++) {
        //     games[i] = 
        //     <h5> {this.state.count}/{this.props.games[i].player_ids.length} Players </h5>
        // }

        return (
            <div className="lobby-row">
                <h3 className="lobby-row-title">Server Title</h3>

                <div className="simple-column">
                    <h4>chat-enabled: Yes</h4>
                    <h4>Board-size: 19x19</h4>
                    <h4>grid-layout: standard</h4>
                </div>

                <div className="lobby-row-right-items">
                    <h5>{this.state.count}/{this.props.games[this.props.idx].player_ids.length} Players</h5>
                    <button onClick={this.handleClick} className="blue-button" id="splash-page-join-lobby-button">Join Game</button>
                </div>
            </div>
        )
    }
}
