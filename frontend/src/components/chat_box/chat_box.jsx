import React, { Component } from 'react';
import ChatBoxNavBar from './chat_box_nav_bar'
import ChatInput from './chat_input'
import './chat_box.css';
import io from 'socket.io-client'

export default class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const socket = io('http://localhost:5000');
        socket.emit("sendingMessage", {message: this.state.newMessage});
        this.setState({ newMessage: ""})
        // this.props.login(this.state).then(this.props.closeModal);
        //.then(() => this.props.history.push('/user'));
    }

    componentDidMount() {
        const socket = io('http://localhost:5000');
        socket.on("receiveMessage", (data) => {
            this.setState({ messages: this.state.messages.concat(data.message)});
            })
    }

    render() {
        return (
            <div className="chat-box">
                <ChatBoxNavBar />

                {
                    this.state.messages.map(function (message) {
                        return <p className="chat-box-message" key={message}>{message}</p>
                    })
                }
                {/* for(let i = 0; i < this.state.messages.length; i++) {
                    <li className="simple-column">{this.state.messages[i]}</li>
                } */}
                
                {/* <ul className="simple-column">
                    <li className="simple-column">{this.state.messages}</li>
                </ul> */}

                <div className="chat-input-div">
                    <input placeholder="Your message" value={this.state.newMessage} onChange={this.handleInput('newMessage')} type="text" className="chat-input-div-input" />
                    <button className="chat-input-div-send-button" onClick={this.handleSubmit}><b>Send</b></button>
                </div>
            </div>
        )
    }
}
