import React, { Component } from 'react'

export default class LogoutButton extends Component {
    
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.props.logout(this.state)
    //     //.then(() => this.props.history.push('/user'));

    // }

    handleSubmit(e) {
        // debugger;
        e.preventDefault();
        this.props.logout();
        // .then(() => this.props.history.push('/user'));
    }
    
    render() {
        return (
            <form className="drop-down-menu-option" onSubmit={this.handleSubmit}>
                <button className="drop-down-menu-option-title" type="submit">Log Out</button>
            </form>
        )
    }
}
