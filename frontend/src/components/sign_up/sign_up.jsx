import React, { Component } from 'react';
import './sign_up.css'
// import NavBar from '../nav_bar/nav_bar';
import CloseIcon from '../general_purpose_icons/close_icon'

export default class SignUp extends Component {


    // makeid(length) {
    //     var result = '';
    //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }

    constructor(props) {
        super(props);
        this.state = {
            // handle: '',
            password: '',
            email: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchToSignIn = this.switchToSignIn.bind(this);
    }


    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.createNewUser(this.state).then(this.props.closeModal);
            //.then(() => this.props.history.push('/user'));
    }

    // renderErrors() {
    //     return (
    //         <ul className="session-error-messages-list">
    //             {this.props.errors.map((error, i) => (
    //                 <li key={`error-${i}`} className="session-error-message">
    //                     {error}
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // }

    switchToSignIn(event) {
        event.stopPropagation();
        this.props.closeModal();
        this.props.openModal('login');

        // kc why does this immediately close?
    }

    render() {
        // if (!this.state.visible) {
        //     return <div></div>;
        // }
        return (
            // <div className="session-grey-background" onClick={this.props.toggleSignUpModal}>
                // <div onClick={e => e.stopPropagation()}>
                <div>
                    {/* <div className="close-icon-button-div">
                        <button className="close-icon-button" onClick={this.props.closeModal}><CloseIcon /></button>
                    </div> */}

                    <form className="sign-up-session-content" onSubmit={this.handleSubmit}>

                        <h3 className="session-title">Welcome!</h3>
                        <h4 className="session-login-signup-subtitle">Sign up to join Gogo.</h4>

                        <p className="session-label">Email</p>
                        <input placeholder="Your  Username" className="session-input" type="text" value={this.state.email} onChange={this.handleInput('email')} />

                        {/* <p className="session-label">Username</p>
                        <input placeholder="Your  Username" className="session-input" type="text" value={this.state.handle} onChange={this.handleInput('handle')}/> */}

                        <p className="session-label">Password</p>
                        <input placeholder="Password" className="session-input-password" type="password" value={this.state.password} onChange={this.handleInput('password')}/>

                        {/* {this.renderErrors()} */}

                        <button type="submit" className="color-button" id="session-submit-button"> Sign Up </button>
                    </form>

                    <div className="login-signup-option-row" onClick={this.switchToSignIn}>
                        <h4 className="switch-to-sign-up-text">Here for a Demo? </h4>
                        <button className="switch-to-sign-up-button"> Sign In </button>
                    </div>
                </div>
        )
    }
}
