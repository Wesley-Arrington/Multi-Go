import React, { Component } from 'react'

export default class EditGame extends Component {
    render() {
        return (
            <div className="simple-column">
                <input className="edit-game-input-text" placeholder="Lobby Name" type="text" name="" id=""/>
                <label htmlFor=""> Number of Players: 
                </label>
                <select name="" id="">
                    <option value="American">2 Player</option>
                    <option value="Andean">3 Player</option>
                </select>
                <button className="blue-button"> Save Settings </button>
            </div>
        )
    }
}
