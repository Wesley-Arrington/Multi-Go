import React, { Component } from 'react'
import SignUpButtonContainer from './sign_up_button_container'
import LoginButtonContainer from './login_button_container';

export default class LoggedOutOptions extends Component {
    render() {
        return (
            <div className="logged-out-options">
                <LoginButtonContainer />
                <SignUpButtonContainer />
            </div>
        )
    }
}
