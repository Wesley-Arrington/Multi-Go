import React, { Component } from 'react';
import ChatBoxNavBar from './chat_box_nav_bar'
import ChatInput from './chat_input'
import './chat_box.css';

export default class ChatBox extends Component {
    render() {
        return (
            <div className="chat-box">
                <ChatBoxNavBar />
                <ChatInput />
            </div>
        )
    }
}
