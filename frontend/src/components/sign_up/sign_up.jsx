import React, { Component } from 'react';
import './sign_up.css'
// import NavBar from '../nav_bar/nav_bar';
import CloseIcon from '../general_purpose_icons/close_icon'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            profile_body: "raised by wolves"
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

    switchToSignIn() {
        // this.props.closeModal();
        // debugger;
        console.log("CLICKING BUTTTTON")
        // dispatch(this.props.openModal('login'));
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

                        <p className="session-label">First Name</p>
                        <input placeholder="Your First Name" className="session-input" type="text" value={this.state.first_name} onChange={this.handleInput('first_name')}/>

                        <p className="session-label">Last Name</p>
                        <input placeholder="Your Last Name" className="session-input" type="text" value={this.state.last_name} onChange={this.handleInput('last_name')}/>

                        <p className="session-label">Email</p>
                        <input placeholder="Your Email" className="session-input" type="text" value={this.state.email} onChange={this.handleInput('email')}/>
                       

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
                // </div>
            // </div>
        )
    }
}
