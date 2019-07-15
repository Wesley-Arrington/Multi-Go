import React, { Component } from 'react'
import './lobby.css'
import LobbyRow from './lobby_row'

export default class LobbyRows extends Component {
    render() {
        return (
            <div className="width-100">
                <LobbyRow />
            </div>
        )
    }
}
