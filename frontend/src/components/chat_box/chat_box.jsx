import React, { Component } from 'react';
import ChatBoxNavBar from './chat_box_nav_bar'
import ChatInput from './chat_input'
import './chat_box.css';
import io from 'socket.io-client';

export default class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: {
                body: [],
                authors: []
            },
            newMessage: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const socket = io('https://multi-go.herokuapp.com');

        socket.emit("sendingMessage", { body: this.state.newMessage, author: this.props.currentUser.email});
        this.setState({ newMessage: ""})
    }

    componentDidMount() {
        const socket = io('https://multi-go.herokuapp.com');
        socket.on("receiveMessage", (data) => {

            this.setState({ 
                messages: { 
                    body: this.state.messages.body.concat(data.body),
                    authors: this.state.messages.authors.concat(data.author)
                },
                
            });
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {

            document.getElementById('send-message-btn').click();
        }
    }

    render() {

        let messages = []
        for (let i = 0; i < this.state.messages.authors.length; i++) {
            
            messages.push(<div className="message-div"><h5>{this.state.messages.authors[i]}</h5> <h4>{this.state.messages.body[i]}</h4></div>)

        }
        
        return (
            <div className="chat-box">
                <div className="chat-box-chat-section">
                    {messages}
                </div>
                <div className="chat-input-div">
                    <input onKeyPress={this.handleKeyPress} placeholder="Your message" value={this.state.newMessage} onChange={this.handleInput('newMessage')} type="text" className="chat-input-div-input" />
                    <button id="send-message-btn" className="chat-input-div-send-button" onClick={this.handleSubmit}><b>Send</b></button>
                </div>
            </div>
        )
    }
}
