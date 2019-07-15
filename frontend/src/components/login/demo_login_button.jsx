import React, { Component } from 'react'

export default class DemoLoginButton extends Component {

    constructor(props) {
        super(props);
        this.demoLogin = this.demoLogin.bind(this);
    }

    async demoLogin(e) {
        e.preventDefault();

        const demoUser = {
            email: 'password',
            password: 'password'
        };

        const sleep = ms => new Promise(res => setTimeout(res, ms));

        document.getElementById('email-input').focus();
        for (let i = 1; i <= demoUser.email.length; i++) {
            this.setState({ email: demoUser.email.substr(0, i) });
            await sleep(50);
        }

        await sleep(250);

        document.getElementById("password-input").focus();
        for (let i = 1; i <= demoUser.password.length; i++) {
            this.setState({ password: demoUser.password.substr(0, i) });
            await sleep(50);
        }

        await sleep(250);

        document.getElementById('session-submit-button').click();
        document.getElementById("password-input").blur();
    }

    render() {
        return (
            <button className="color-button" id="session-demo-login-button" onClick={this.demoLogin}> 
                DEMO LOG IN
            </button>
        )
    }
}
