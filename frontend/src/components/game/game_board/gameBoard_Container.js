import { connect } from 'react-redux';
// import { createGame } from '../../actions/game_action';
import GameBoard from './game_board';

const msp = state => {
    return {
        // sometimes we dont have .grid yet
        points: state.entities.games
    }
}

const mdp = dispatch => {
    return {
        // newGame: (data) => dispatch(createGame(data))
    }
}

export default connect(msp, null)(GameBoard);