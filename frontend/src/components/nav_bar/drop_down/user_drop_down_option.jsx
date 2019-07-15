import React, { Component } from 'react'

export default class UserDropDownOption extends Component {
    render() {
        return (
            <div className="drop-down-menu-option">
                <button className="drop-down-menu-option-title">{this.props.title}</button>
            </div>
        )
    }
}
