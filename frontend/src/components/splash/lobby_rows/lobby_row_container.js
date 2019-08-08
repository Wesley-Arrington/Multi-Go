import { connect } from 'react-redux';
import { patchGame } from '../../../actions/game_action';

import LobbyRow from './lobby_row';

const msp = state => {
    return {
        // game_id: state
    }
}

const mdp = dispatch => {
    return {
        // 1. fetch the game information
        // 2. patch the DB with 2nd player id
        // newGame: (data) => dispatch(createGame(data)),
        joinGame: (data) => dispatch(patchGame(data))
    }
    
}

export default connect(msp, mdp)(LobbyRow);