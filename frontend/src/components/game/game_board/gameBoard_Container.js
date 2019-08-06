import { connect } from 'react-redux';
import { fetchGame } from '../../../actions/game_action';

import GameBoard from './game_board';

const msp = state => {

    return {
        game: state.entities.games
    }
}

const mdp = dispatch => {
    return {
        getGame: (id) => dispatch(fetchGame(id))
    }
}

export default connect(msp, mdp)(GameBoard);