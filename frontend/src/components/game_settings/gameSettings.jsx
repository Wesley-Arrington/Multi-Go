import React, { Component } from 'react';
import io from 'socket.io-client';

export default class GameSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // kc will have to eventaullyx take input value from form
        this.setState({
            players: new Array(3),
            size: 19
        })

        // , this.emitMsg()
        // callback should do the same thing as componentDidUpdate

        // #ofplayers should come from the form in modal 
        let players = new Array(3)
        players[0] = this.props.session.user.email;

        let data = {
            player_ids: players,
            // grid: [{
            //     xCoord: 0,
            //     yCoord: 0,
            //     color: "R"
            // }],
            turn: "0"
        }

        this.props.closeModal();

        this.props.newGame(data).then((game) => {
            return (
            this.props.history.push(`/game/${game.game._id}/`))
        });



        // let fakedata = {
        //     players: players
        // }
        // this.props.updateSetting(fakedata)
            
    }

    componentDidUpdate() {
        console.log(this.state)
        const socket = io('http://localhost:5000');
        socket.emit("start", { 
            message: "start", 
            players: this.state.players
        });

    }

    // emitMsg() {
    //     console.log(this.state)
    //     console.log("click")
    //     const socket = io('http://localhost:5000');
    //     socket.emit("start", { message: "start" });
    // }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="game-settings-white-background">
                <div className="game-settings-content-container">
                    <div className="simple-column">
                        <h3 className="lobby-edit-game-title"><b>Game Settings</b></h3>
                        <input className="edit-game-input-text" placeholder="Lobby Name" type="text" name="" id="" />
                        <label htmlFor=""> Number of Players:
                    </label>
                        <select name="" id="">
                            <option value="American">2 Player</option>
                            <option value="Andean">3 Player</option>
                            <option value="Andean">4 Player</option>
                            <option value="Andean">5 Player</option>
                        </select>

                        <button onClick={this.handleClick} className="blue-button" id="lobby-save-settings-button"> Play! </button>
                    </div>
                </div>
            </div>
        )
    }
}
