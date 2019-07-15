import React, { Component } from 'react'

export default class LobbyRow extends Component {
    render() {
        return (
            <div className="simple-row-center-y-flex-start-padding-20">
                <h3 className="lobby-row-title">Server Title</h3>

                <div className="simple-column">
                    <h4>chat-enabled: Yes</h4>
                    <h4>Board-size: 19x19</h4>
                    <h4>grid-layout: standard</h4>
                </div>

                <div className="lobby-row-right-items">
                    <h5>Align Front</h5>
                    <button className="blue-button" id="splash-page-join-lobby-button">Join Lobby</button>
                </div>
            </div>
        )
    }
}
