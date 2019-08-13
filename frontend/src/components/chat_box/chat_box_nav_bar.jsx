import React, { Component } from 'react';
// import MinusIcon from './minus_icon';

export default class ChatBoxNavBar extends Component {
    render() {
        return (
            <div className="chat-box-nav-bar">
                {/* <MinusIcon /> */}
                {/* <button className="chat-box-nav-bar-button">-</button> */}
                
                <img src={"minus-symbol.svg"} alt="" className="chat-box-nav-bar-button"/>
            </div>
        )
    }
}
