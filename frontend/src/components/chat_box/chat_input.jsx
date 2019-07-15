import React, { Component } from 'react'

export default class ChatInput extends Component {
    render() {
        return (
            <div className="chat-input-div">
                <input type="text" className="chat-input-div-input"/>
                <button className="chat-input-div-send-button"><b>Send</b></button>
            </div>
        )
    }
}
