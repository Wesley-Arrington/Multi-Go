import React, { Component } from 'react'

export default class LobbyRow extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.props.fetch information about game
        // this.props.patch it with the 2nd/3rd player's id
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
                    <h5>2/3 Players</h5>
                    <button onClick={this.handleClick} className="blue-button" id="splash-page-join-lobby-button">Join Lobby</button>
                </div>
            </div>
        )
    }
}
