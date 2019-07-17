import React, { Component } from 'react'

export default class EditGame extends Component {
    render() {
        return (
            <div className="simple-column">
                <h3 className="lobby-edit-game-title"><b>Game Settings</b></h3>
                <input className="edit-game-input-text" placeholder="Lobby Name" type="text" name="" id=""/>
                <label htmlFor=""> Number of Players: 
                </label>
                <select name="" id="">
                    <option value="American">2 Player</option>
                    <option value="Andean">3 Player</option>
                    <option value="Andean">4 Player</option>
                    <option value="Andean">5 Player</option>
                </select>

                <button className="blue-button" id="lobby-save-settings-button"> Save Settings </button>
            </div>
        )
    }
}
