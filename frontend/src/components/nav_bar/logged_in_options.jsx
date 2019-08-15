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
        // // kc: how do i get the game information back? // fetch game info from the DB
        // let id = this.props.game.id || JSON.parse(sessionStorage.getItem('game')).id

        // this.props.fetchGame(id);
        this.props.history.push(`/game/${this.props.game.id}`);
    }

    render() {
        let { currentUser } = this.props;
        let dropDown = <div>test</div>
        if (this.state.visable) {
            dropDown = <DropDown />
        } else {
            dropDown = <div></div>
        }

        // if (window.location.href.includes("game")) { //should change to check if first person in player_id for game and also on game screen
        //     gameSettingsButton = <button className="user-menu" onClick={() => this.props.openModal('gameSettings')}><b> Game Settings </b></button>
        // }

        let changeView ;

        if (window.location.href.includes("game")) {
            changeView = <button onClick={this.goHome} className="user-menu">Home</button>
        } else {
            changeView = <button onClick={this.rejoinGame} className="user-menu">Rejoin Game</button>
        }

        return (
            <div className="logged-in-options">
                {changeView}
                <button onClick={this.toggleMenu} className="user-menu">{currentUser.email}</button>
                {dropDown}
            </div>
        )
    }
}
