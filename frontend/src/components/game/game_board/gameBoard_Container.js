import { connect } from 'react-redux';
import { fetchGame, updateTurn } from '../../../actions/game_action';

import GameBoard from './game_board';

const msp = state => {

    return {
        game: state.entities.game
    }
}

const mdp = dispatch => {
    return {
        getGame: (id) => dispatch(fetchGame(id)),
        updateTurn: () => dispatch(updateTurn())
    }
}

export default connect(msp, mdp)(GameBoard);