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
        // console.log("HANDLING THE SUBMIT");
        const socket = io('http://localhost:5000');
        debugger;
        socket.emit("sendingMessage", {message: this.state.newMessage});
        // this.props.login(this.state).then(this.props.closeModal);
        //.then(() => this.props.history.push('/user'));
    }

    componentDidMount() {
        const socket = io('http://localhost:5000');
        // socket.emit("join", {name: Math.random()*100});
        // socket.on("someoneJoined", (data) => { console.log(`${data.name} has joined room`) })
        socket.on("receiveMessage", (data) => {
            const messages = this.state.messages;
            this.setState({messages: messages.concat(data.message)});
            })
    }

    render() {
        return (
            <div className="chat-box">
                <ChatBoxNavBar />

                <div className="chat-input-div">
                    <input value={this.state.newMessage} onChange={this.handleInput('newMessage')} type="text" className="chat-input-div-input" />
                    <button className="chat-input-div-send-button" onClick={this.handleSubmit}><b>Send</b></button>
                </div>
            </div>
        )
    }
}
