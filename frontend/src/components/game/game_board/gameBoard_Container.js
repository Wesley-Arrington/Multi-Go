import { connect } from 'react-redux';
import { fetchGame, updateTurn, patchGame, changeSetting } from '../../../actions/game_action';

import GameBoard from './gameBoard';

const msp = state => {

    return {
        game: state.entities.game
    }
}

const mdp = dispatch => {
    return {
        getGame: (id) => dispatch(fetchGame(id)),
        makeMove: (id, grid) => dispatch(patchGame(id, grid)),
        updateTurn: () => dispatch(updateTurn()),
        changeSetting: (numPlayers) => dispatch(changeSetting(numPlayers))
    }
}

export default connect(msp, mdp)(GameBoard);