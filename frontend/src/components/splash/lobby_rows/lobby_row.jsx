import React, { Component } from 'react'

export default class LobbyRow extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.props.fetch information about game
        // this.props.patch it with the 2nd/3rd player's id

        this.props.games[this.props.idx].player_ids.push(this.props.session.user.email)

        let dummyData = {
            player_ids: this.props.games[this.props.idx].player_ids     
        }
        
        this.props.joinGame(this.props.games[this.props.idx]._id, dummyData);
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
                    <h5>{this.props.playerCount}/5 Players</h5>
                    <button onClick={this.handleClick} className="blue-button" id="splash-page-join-lobby-button">Join Game</button>
                </div>
            </div>
        )
    }
}
