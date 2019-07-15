import React, { Component } from 'react'
// import SignUp from '../sign_up/sign_up';
import { Link } from 'react-router-dom'
import SignUpContainer from '../sign_up/sign_up_container'

export default class SignUpButton extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     signUpVisible: false
        // }

        // this.toggleSignUpModal = this.toggleSignUpModal.bind(this);
    }

    //     this.closeModal = this.openModal.bind(this);
    //     this.openModal = this.closeModal.bind(this);
    // }

    // toggleSignUpModal() {
    //     console.log("toggleModal")
    //     if (this.state.signUpVisible) {
    //         this.setState({
    //             signUpVisible: false
    //         })
    //     } else {
    //         this.setState({
    //             signUpVisible: true
    //         })
    //     }
    // }

    render() {
        // if(this.state.signUpVisible) {
            return (
                <div>
                    <button onClick={() => this.props.openModal('signup')} className="purple-hover-btn">Sign Up</button> 
                    {/* <SignUpContainer toggleSignUpModal={this.toggleSignUpModal} /> */}
                </div>
            )
        // } 
        // else {
        //     return (
        //         <div>
        //             <button onClick={this.toggleSignUpModal} className="purple-hover-btn">Sign Up</button>
        //         </div>
        //     )
        // }
    }
}
