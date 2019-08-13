import React, { Component } from 'react'
import DropDown from './drop_down/user_drop_down_options'

export default class LoggedInOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visable: false
        }
        this.goHome = this.goHome.bind(this);
        this.rejoinGame = this.rejoinGame.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        if(this.state.visable) {
            this.setState({
                visable: false
            })
        } else {
            this.setState({
                visable: true
            })
        }

        //this whole toggle thing is stupid instead do a menu that is always exists and then modify 
        //the value of visable or location or what evs to render it
        //class is user_drop_down_options
    }

    goHome() {
        this.props.history.push('/');
    }

    rejoinGame() {
        // debugger
        this.props.history.push(`/game/${this.props.game.id}`);
    }

    render() {
        // let currentSessionId = store.getState().session.id
        // let currentUser = store.getState().entities.user[currentSessionId].first_name

        let { currentUser } = this.props;
        let dropDown = <div>test</div>
        if (this.state.visable) {
            dropDown = <DropDown />
        } else {
            dropDown = <div></div>
        }

        let gameSettingsButton = <div></div>

        // if (window.location.href.includes("game")) { //should change to check if first person in player_id for game and also on game screen
        //     gameSettingsButton = <button className="user-menu" onClick={() => this.props.openModal('gameSettings')}><b> Game Settings </b></button>
        // }

        return (
            <div className="logged-in-options">
                {/* <img onClick={this.toggleMenu} className="logged-in-options-robot-image" src={"user-default-profile-picture.png"} alt=""/> */}
                <button onClick={this.goHome} className="user-menu">Home</button>
                <button onClick={this.rejoinGame} className="user-menu">Rejoin Game</button>
                <button onClick={this.toggleMenu} className="user-menu">{currentUser.email}</button>
                {dropDown}
            </div>
        )
    }
}
