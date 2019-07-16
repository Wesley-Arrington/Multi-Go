import React, { Component } from 'react';
import ChatBoxNavBar from './chat_box_nav_bar'
import ChatInput from './chat_input'
import './chat_box.css';
import io from 'socket.io-client'

export default class ChatBox extends Component {

    componentDidMount() {
        const socket = io('http://localhost:5000');
        socket.emit("join", {name: Math.random()*100});
        socket.on("someoneJoined", (data) => { console.log(`${data.name} has joined room`) })
    }

    render() {
        return (
            <div className="chat-box">
                <ChatBoxNavBar />
                <ChatInput />
            </div>
        )
    }
}
