import React, { Component } from 'react'

export default class LobbyRow extends Component {
    constructor(props) {
        super(props);
        this.handleClickJoin = this.handleClickJoin.bind(this);
        this.handleClickView = this.handleClickView.bind(this);

        let count = 0;
        let players = this.props.games[this.props.idx].player_ids;
        for (let i = 0; i < players.length; i++) {
            if (players[i]) {
                count += 1
            }
        }

        this.state = {count: count}
    }

    handleClickJoin() {
        let players = this.props.games[this.props.idx].player_ids;
        
        // kc: setting localStorage.game to {} for systematic approach
        localStorage.setItem("game", JSON.stringify(
            {}
        ))

        for (let i = 0; i<players.length; i++) {
            if (!players[i]) {
                players[i] = this.props.session.user.email;
                break;
            }
        }

        // let data = {
        //     player_ids: players,
        // }

        let data = {
            id: this.props.games[this.props.idx]._id,
            player_ids: players,
            turn: 0
        }

        // this.props.updateSetting(frontendData);

        // kc: used a .then perfectly!
        this.props.joinGame(data).then(() => {
        this.props.history.push(`/game/${this.props.games[this.props.idx]._id}/`)})
    }
    
    handleClickView() {
        this.props.history.push(`/game/${this.props.games[this.props.idx]._id}/`)
    }

    render() {

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

                    {(this.state.count/this.props.games[this.props.idx].player_ids.length === 1) ? 
                        <button className="blue-button" id="splash-page-join-lobby-button">Full Game</button> : 
                        <button onClick={this.handleClickJoin} className="blue-button" id="splash-page-join-lobby-button">Join Game</button>}

                </div>
            </div>
        )
    }
}
