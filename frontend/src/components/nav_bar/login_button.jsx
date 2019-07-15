import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Login from '../login/login'
// import { RECEIVE_SESSION_ERRORS } from '../../actions/session_actions';
// import { receiveErrors } from '../../actions/session_actions'


export default class LoginButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // if(this.state.loginVisable) {
            return (
                <div>
                    <button onClick={() => this.props.openModal('login')} className="purple-hover-btn">
                        Login
                    </button>
                </div>
            )
        // } 
        // else {
        //     return (
        //         <div onClick={this.toggleLoginModal}>
        //             <button className="purple-hover-btn">Login</button>
        //         </div>
        //     )
        // }
    }
}
